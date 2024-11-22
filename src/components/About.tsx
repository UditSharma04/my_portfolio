import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div id='about' className='w-full h-screen bg-primary text-gray-300'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <motion.div 
            className='sm:text-right pb-8 pl-4'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-4xl font-bold inline border-b-4 border-secondary'>
              About
            </p>
          </motion.div>
          <div></div>
        </div>
        <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
          <motion.div 
            className='sm:text-right text-4xl font-bold'
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>Hi, I'm Udit, nice to meet you. Please take a look around.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className='text-lightestText'>
              I am passionate about building excellent software that improves
              the lives of those around me. I specialize in creating software
              solutions for clients ranging from individuals and small-businesses all the
              way to large enterprise corporations. What would you do if you had
              a software expert available at your fingertips?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
