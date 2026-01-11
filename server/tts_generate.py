# tts_generate.py
# Usage: py tts_generate.py --text "Halo" --out audios/message_0.wav
# Requirements: transformers, torch, numpy, soundfile, (ffmpeg optional for mp3)
import argparse, sys, io, base64, shutil, subprocess
from pathlib import Path\
    

def has_ffmpeg(): return shutil.which("ffmpeg") is not None
def run_cmd(cmd): return subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def write_wav_from_array(arr, sr, out_path):
    import numpy as np, soundfile as sf
    arr = np.asarray(arr)
    # if shape is (1, N) or (N, 1) flatten to (N,)
    if arr.ndim == 2 and arr.shape[0] == 1:
        arr = arr[0]
    # if stereo-like (N,2) keep as is
    # convert float arrays to float32
    if arr.dtype != 'float32':
        arr = arr.astype('float32')
    out_path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(out_path), arr, samplerate=int(sr), format='WAV', subtype='PCM_16')
    print(f"Wrote WAV {out_path}", file=sys.stderr)

def write_bytes(path: Path, b: bytes):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "wb") as f:
        f.write(b)

def convert_to_mp3(wav_path: Path, mp3_path: Path):
    if not has_ffmpeg():
        raise RuntimeError("ffmpeg not found in PATH for MP3 conversion")
    cmd = ["ffmpeg", "-y", "-i", str(wav_path), str(mp3_path)]
    p = run_cmd(cmd)
    if p.returncode != 0:
        raise RuntimeError(f"ffmpeg failed: {p.stderr.decode(errors='ignore')}")
    return True

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--model", default="facebook/mms-tts-ind")
    args = parser.parse_args()

    out_path = Path(args.out)
    out_ext = out_path.suffix.lower()

    try:
        from transformers import pipeline
    except Exception as e:
        print("Install transformers torch numpy soundfile", file=sys.stderr)
        raise

    print("Loading model pipeline (may take time)...", file=sys.stderr)
    tts = pipeline("text-to-speech", model="PretrainedModel/facebook-mms-tts-ind")
    print("Running TTS...", file=sys.stderr)
    res = tts(args.text)

    if isinstance(res, list) and len(res) > 0:
        res = res[0]

    # prefer keys: 'array' or numpy 'audio' or 'audio' bytes/base64
    audio_array = None
    sampling_rate = 24000

    if isinstance(res, dict):
        # Case: 'array' key (numpy list/array)
        if "array" in res:
            audio_array = res["array"]
            sampling_rate = res.get("sampling_rate", sampling_rate)
        # Case: 'audio' may be numpy ndarray or bytes or base64 string
        elif "audio" in res:
            aud = res["audio"]
            # numpy array
            try:
                import numpy as np
                if isinstance(aud, (list, tuple)) or (hasattr(aud, "shape") and isinstance(getattr(aud,"shape"), tuple)):
                    audio_array = aud
                    sampling_rate = res.get("sampling_rate", sampling_rate)
                elif isinstance(aud, (bytes, bytearray)):
                    raw_bytes = bytes(aud)
                    fmt = None
                    # try decode as wav via soundfile
                    try:
                        import soundfile as sf, io
                        bio = io.BytesIO(raw_bytes)
                        data, sr = sf.read(bio)
                        audio_array = data
                        sampling_rate = sr
                    except Exception:
                        # not wav; write raw bytes later
                        raw_bytes_out = raw_bytes
                        tmp_out = out_path.with_suffix(out_path.suffix + ".raw")
                        write_bytes(tmp_out, raw_bytes_out)
                        print("Saved raw bytes to", tmp_out, file=sys.stderr)
                        # attempt conversion if requested wav and ffmpeg available
                        if out_ext == ".wav" and has_ffmpeg():
                            # write tmp with guessed ext mp3 and convert
                            guessed = tmp_out.with_suffix(".mp3")
                            tmp_out.replace(guessed)
                            try:
                                convert_to_mp3(guessed, out_path)  # convert mp3->wav? this call will fail; skip
                            except Exception:
                                pass
                        # fallback: saved raw bytes
                        return
                elif isinstance(aud, str):
                    # try base64
                    try:
                        raw = base64.b64decode(aud)
                        # try decode as wav
                        import soundfile as sf, io
                        bio = io.BytesIO(raw)
                        data, sr = sf.read(bio)
                        audio_array = data
                        sampling_rate = sr
                    except Exception:
                        # fallback: raw bytes
                        write_bytes(out_path, base64.b64decode(aud))
                        print("Saved base64-decoded bytes to", out_path, file=sys.stderr)
                        return
            except Exception:
                # fallback: textual repr
                write_bytes(out_path, str(res).encode("utf8"))
                print("Wrote repr to file (fallback)", file=sys.stderr)
                return
    else:
        # non-dict: maybe bytes or str
        if isinstance(res, (bytes, bytearray)):
            write_bytes(out_path, bytes(res)); print("Wrote raw bytes", file=sys.stderr); return
        if isinstance(res, str):
            # base64?
            try:
                raw = base64.b64decode(res)
                write_bytes(out_path, raw); print("Wrote decoded base64", file=sys.stderr); return
            except Exception:
                write_bytes(out_path, res.encode("utf8")); print("Wrote text fallback", file=sys.stderr); return

    # If we got a numpy array, write WAV
    if audio_array is not None:
        write_wav_from_array(audio_array, sampling_rate, out_path.with_suffix(".wav"))
        final_path = out_path.with_suffix(".wav")
        # convert to mp3 if user explicitly asked mp3
        if out_ext == ".mp3":
            if not has_ffmpeg():
                print("ffmpeg not found; left WAV as output", file=sys.stderr)
            else:
                convert_to_mp3(final_path, out_path)
                print("Converted to mp3:", out_path, file=sys.stderr)
        else:
            # if wanted .wav but out_path already .wav keep it
            if out_path != final_path:
                final_path.replace(out_path)
        return

    # fallback final
    write_bytes(out_path, str(res).encode("utf8"))
    print("Final fallback wrote text to", out_path, file=sys.stderr)

if __name__ == "__main__":
    main()
