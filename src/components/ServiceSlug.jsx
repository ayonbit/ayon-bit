"use client";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

const ServiceSlug = ({ service }) => {
  return (
    <>
      {/* Services Accordion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
        className="w-full md:w-5/6 lg:w-3/4 mx-auto"
      >
        <Accordion type="single" collapsible>
          {service.data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.3 + index * 0.1,
                duration: 0.5,
              }}
            >
              <AccordionItem
                value={item.title} // Using item.title as the value
                className="border-b border-white/10"
              >
                <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl md:text-2xl font-bold py-8 text-white hover:text-accent transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4"
                  >
                    <FiChevronDown className="text-xl text-white group-hover:text-accent transition-colors" />
                  </motion.div>
                </AccordionTrigger>

                <AccordionContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="list-disc pl-6 pt-2 space-y-2"
                  >
                    {item.description.map((desc, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="text-white/80 text-md p-2"
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <Link href="/contact" passHref legacyBehavior>
          <Button className="font-semibold px-8 py-6 text-primary">
            Let&apos;s Talk?
          </Button>
        </Link>
      </motion.div>
    </>
  );
};

export default ServiceSlug;
