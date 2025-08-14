"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  const cardMotion = {
    initial: { x: 10, rotate: -2 },
    hover: { x: 0, rotate: 0 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={cardMotion}
      className="h-full w-full rounded-2xl bg-white p-4 dark:bg-black 
                 dark:border-white/[0.1] border border-neutral-200 flex flex-col 
                 items-center justify-center"
    >
      <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-2">
        {note.title}
      </p>
      <p className="text-xs text-neutral-500 text-center">{note.content}</p>
      <p className="text-xs text-neutral-400 mt-2">{formattedDate}</p>
      <Button
        onClick={() => onDelete(note.id)}
        className="mt-4 px-3 py-1 text-xs bg-red-100 text-red-600 
                   rounded-full hover:bg-red-200 dark:bg-red-900/20 
                   dark:hover:bg-red-900/30"
      >
        Delete
      </Button>
    </motion.div>
  );
}