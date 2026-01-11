import requests
from datetime import datetime, timezone, timedelta

API_KEY = "sk_410cf548129218e50e1adae1f438e0c7c4eba86c6b3d0a72"

headers = {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json"
}

resp = requests.get("https://api.elevenlabs.io/v1/user", headers=headers)
data = resp.json()
sub = data["subscription"]

print("Tier:", sub["tier"])
print("Karakter digunakan:", sub["character_count"])
print("Limit karakter:", sub["character_limit"])
print("Sisa karakter:", sub["character_limit"] - sub["character_count"])

# =====================
# RESET KUOTA → WIB
# =====================
if "next_character_count_reset_unix" in sub:
    utc_time = datetime.fromtimestamp(
        sub["next_character_count_reset_unix"],
        tz=timezone.utc
    )
    wib_time = utc_time.astimezone(
        timezone(timedelta(hours=7))
    )

    print("Reset kuota (UTC):", utc_time)
    print("Reset kuota (WIB):", wib_time)
else:
    print("Info reset kuota tidak tersedia")

# =====================
# END / RENEW SUBSCRIPTION
# =====================
if "expires_at_unix" in sub:
    end_utc = datetime.fromtimestamp(
        sub["expires_at_unix"],
        tz=timezone.utc
    )
    end_wib = end_utc.astimezone(
        timezone(timedelta(hours=7))
    )

    print("Subscription berakhir (UTC):", end_utc)
    print("Subscription berakhir (WIB):", end_wib)
else:
    print("Tanggal end subscription tidak tersedia di API")
