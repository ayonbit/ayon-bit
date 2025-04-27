"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkSliderBtns from "@/components/WorkSliderBtns";
import { projectData } from "@/lib/data";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const PortfolioCard = () => {
  const [activeProject, setActiveProject] = useState(projectData[0]);
  const [loadedImages, setLoadedImages] = useState({});
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback((swiper) => {
    setActiveProject(projectData[swiper.activeIndex]);
  }, []);

  const handleImageLoad = useCallback((projectNum) => {
    setLoadedImages((prev) => ({ ...prev, [projectNum]: true }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
          {/* Project Details Column - Wider and better spaced */}
          <div className="w-full xl:w-[48%] flex flex-col order-2 xl:order-none">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-6xl font-extrabold text-transparent text-outline">
                  {activeProject.num}
                </span>
                <h2 className="text-3xl font-bold text-white mt-2">
                  {activeProject.title}
                </h2>
                <h3 className="text-xl font-medium text-accent">
                  {activeProject.category}
                </h3>
              </div>

              <p className="text-white/80 leading-relaxed text-lg">
                {activeProject.description}
              </p>

              {/* Tech Stack Tags - Improved spacing */}
              <div className="flex flex-wrap gap-3 mb-2">
                {activeProject.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm text-accent hover:bg-white/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="border-t border-white/20 my-4"></div>

              {/* Project Links - Better alignment */}
              <div className="flex items-center gap-6">
                {activeProject.live && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={activeProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full bg-white/5 flex justify-center items-center hover:bg-accent transition-all duration-300 group"
                          aria-label="View live project"
                        >
                          <BsArrowUpRight className="text-white text-2xl group-hover:scale-110 transition-transform" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {activeProject.github && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={activeProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-14 h-14 rounded-full bg-white/5 flex justify-center items-center hover:bg-accent transition-all duration-300 group"
                          aria-label="View GitHub repository"
                        >
                          <BsGithub className="text-white text-2xl group-hover:scale-110 transition-transform" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>GitHub Repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>

          {/* Project Slider Column - Adjusted height and spacing */}
          <div className="w-full xl:w-[52%] relative">
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              onSlideChange={handleSlideChange}
              className="relative group"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {projectData.map((project) => (
                <SwiperSlide key={project.num}>
                  <div className="relative h-[300px] md:h-[350px] xl:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 shadow-lg">
                    {!loadedImages[project.num] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                        <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-fit transition-opacity duration-500 ${
                        loadedImages[project.num] ? "opacity-100" : "opacity-0"
                      }`}
                      priority={project.num === "01"}
                      onLoad={() => handleImageLoad(project.num)}
                      onError={() => handleImageLoad(project.num)}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns
                containerStyles="absolute bottom-6 right-6 flex gap-3 z-10"
                btnStyles="bg-accent hover:bg-accent-hover text-primary w-12 h-12 flex justify-center items-center transition-all rounded-full shadow-md hover:scale-105"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
