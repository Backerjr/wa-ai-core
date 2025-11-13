"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { studentSpotlight } from "@/lib/data/spotlight";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function StudentSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[var(--color-fg)]">Student Spotlight 🌟</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {studentSpotlight.map((spotlight) => (
                <CarouselItem key={spotlight.id}>
                  <div className="flex items-center gap-4">
                    <Image
                      src={spotlight.avatarUrl}
                      alt={spotlight.studentName}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{spotlight.studentName}</h4>
                      <p className="text-sm text-slate-500">{spotlight.achievement}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      </Card>
    </motion.div>
  );
}
