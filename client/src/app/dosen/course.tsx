'use client';
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Footer } from '../Component/Footer';
import { fetchWithToken } from "@/lib/fetchWithToken";
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';
import Link from "next/link";

type Course = {
  title: string;
};

type Material = {
  material_id: number;
  materials_title: string;
  course: Course;
};

const CoursePage = (): JSX.Element => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    async function getMaterials(): Promise<void> {
      try {
        const response = await fetchWithToken('/materials');
        const data: Material[] = await response.json();

        const uniqueMap = new Map<string, Material>();
        data.forEach((item) => {
          const key = `${item.material_id}-${item.course.title}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, item);
          }
        });

        setMaterials(Array.from(uniqueMap.values()));
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    }

    getMaterials();
  }, []);

  const filteredMaterials = materials.filter((material) =>
    material.materials_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    return sortOrder === "asc" ? a.material_id - b.material_id : b.material_id - a.material_id;
  });

  const visibleMaterials = showMore ? sortedMaterials : sortedMaterials.slice(0, 6);

  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="w-full px-4 md:px-6 lg:max-w-[1066px] mx-auto py-4 md:py-6">
      <div className="w-full">
        <motion.h1 
        variants={fadeIn('right', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once: false, amount: 0.7}}
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#FAB12F] [font-family:'Outfit',Helvetica] mb-6 md:mb-10">
          List Materi
        </motion.h1>

        <motion.div 
        variants={fadeIn('down', 0.1)}
        initial='hidden'
        whileInView={'show'}
        viewport={{once: false, amount: 0.7}}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-10">
          <div className="w-full sm:w-[436px]">
            <Input
              className="h-[50px] md:h-[70px] bg-[#ffffffa6] rounded-[20px] px-4 md:px-6 text-lg md:text-xl [font-family:'Outfit',Helvetica] font-normal text-[#0000004f]"
              placeholder="Cari Materi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            onClick={handleSort}
            className="h-[42px] w-[117px] rounded-[10px] border border-solid border-[#1F1A17] bg-transparent flex hover:bg-[#FAB12F] items-center gap-2"
          >
            <img
              className={`w-6 h-6 md:w-7 md:h-7 object-cover transition-transform duration-300 ${sortOrder === "desc" ? "rotate-180" : ""}`}
              alt="Sort icon"
              src="/sort.png"
            />
            <span className="[font-family:'Outfit',Helvetica] font-bold text-[#1F1A17] text-[14px] md:text-[15px]">
              Sort by
            </span>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:mb-16">
          {visibleMaterials.map((material) => (
            <Link
              key={material.material_id}
              href={`/belajar/materi/${material.material_id}`}
              className="w-full max-w-[345px] mx-auto"
            >
              <Card className="flex flex-col h-full min-h-[230px] rounded-[15px] border border-[#dcdcdc] shadow-md bg-white transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
                <CardContent className="p-6 flex flex-col justify-center flex-grow">
                  <p className="text-xl font-semibold text-[#FAB12F] mb-2 group-hover:text-[#1F1A17] transition-colors duration-200">
                    Kursus {material.course.title} #{material.material_id}
                  </p>
                  <p className="text-base text-[#4a4a4a] font-normal group-hover:text-[#1a1a1a] transition-colors duration-200">
                    {material.materials_title}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredMaterials.length > 6 && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-[32px] font-medium [font-family:'Outfit',Helvetica] text-[#FAB12F] text-center mb-4">
              Materi Lainnya
            </h2>
            <button 
              onClick={() => setShowMore(!showMore)} 
              className="cursor-pointer transition-transform hover:scale-110"
            >
              <img
                className={`w-[50px] h-[50px] md:w-[70px] md:h-[70px] mb-40 object-cover transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
                alt="More materials icon"
                src="/arrowbottom.png"
              />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;
