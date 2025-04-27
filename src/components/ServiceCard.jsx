"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

export const ServiceCard = ({ service, className, ...motionProps }) => {
  return (
    <motion.div
      {...motionProps}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className={`flex flex-col justify-between gap-6 group overflow-hidden shadow-lg rounded-xl bg-neutral-100/5 p-6 lg:p-8 hover:bg-neutral-100/10 transition-all duration-300 border border-white/5 ${className}`}
    >
      <div className="w-full flex justify-between items-start">
        <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/50 group-hover:from-accent/80 group-hover:to-primary/80 transition-all duration-500">
          {service.num}
        </span>
        <Link
          href={`/service/${service.slug}`}
          aria-label={`Learn more about ${service.category}`}
          className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white hover:rotate-45 group-hover:bg-accent transition-all duration-300 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-neutral-900"
          prefetch={false}
        >
          <BsArrowDownRight className="text-primary text-2xl lg:text-3xl group-hover:text-white transition-colors" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold leading-tight text-white group-hover:text-accent transition-colors duration-300">
          {service.category}
        </h2>
        <p className="text-white/80 text-sm lg:text-base leading-relaxed">
          {service.description}
        </p>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
    </motion.div>
  );
};
