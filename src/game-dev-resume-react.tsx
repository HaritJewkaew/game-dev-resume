import React, { useState, useEffect } from 'react';
import { AlertCircle, Mail, Phone, MapPin, Calendar, Award, Book, Briefcase, Code, Download } from 'lucide-react';

const GameDevResume = () => {
  const birthDate = new Date(2003, 4, 1); // Note: month is 0-indexed, so 4 is May
  const [age, setAge] = useState(0);
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(0);
  const [showBirthdayAchievement, setShowBirthdayAchievement] = useState(false);

  const skills = [
    { name: 'Unity3D', level: 'Intermediate' },
    { name: 'C#', level: 'Intermediate' },
    { name: 'JavaScript (Node.js)', level: 'Beginner' },
    { name: 'PHP', level: 'Beginner' },
    { name: 'VSCode', level: 'Intermediate' },
    { name: 'Postman', level: 'Beginner' },
    { name: 'GitHub Desktop', level: 'Beginner' },
  ];

  const softSkills = ['Share responsibility', 'Friendliness', 'Motivated'];

  useEffect(() => {
    const calculateAge = () => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setAge(age);
    };

    const calculateDaysUntilBirthday = () => {
      const today = new Date();
      const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
      }
      const diffTime = Math.abs(nextBirthday.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilBirthday(diffDays);

      if (diffDays === 0) {
        setShowBirthdayAchievement(true);
        setTimeout(() => setShowBirthdayAchievement(false), 5000);
      }
    };

    calculateAge();
    calculateDaysUntilBirthday();

    const timer = setInterval(calculateDaysUntilBirthday, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    // Replace 'path-to-your-resume-file.pdf' with the actual path to your resume file
    const link = document.createElement('a');
    link.href = '/public/resume_Haritjewjaew.pdf';
    link.download = 'Harit_Jewkaew_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const ProgressBar = ({ value, max, label }) => (
    <div className="mb-2">
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(value / max) * 100}%` }}></div>
      </div>
    </div>
  );

  const SkillBar = ({ skill, level }) => (
    <div className="mb-2 flex items-center">
      <span className="w-1/3">{skill}</span>
      <div className="w-2/3 bg-gray-700 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${level === 'Beginner' ? 'w-1/3 bg-green-500' : level === 'Intermediate' ? 'w-2/3 bg-yellow-500' : 'w-full bg-red-500'}`}></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-start py-8">
      <div className="text-white p-8 font-mono relative max-w-4xl w-full">
        {showBirthdayAchievement && (
          <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black p-2 text-center animate-bounce">
            🎉 Achievement Unlocked: Happy Birthday! 🎂
          </div>
        )}
        
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold mb-2 text-green-400">Harit Jewkaew</h1>
          <p className="text-xl text-yellow-300 mb-4">Backend Developer / Game Dev Enthusiast</p>
          <button 
            onClick={handleDownload}
            className="absolute top-0 right-0 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Download className="mr-2" size={18} />
            Download Resume
          </button>
          <div className="mt-4">
            <ProgressBar value={365 - daysUntilBirthday} max={365} label={`Level ${age}`} />
          </div>
        </header>

        <section className="mb-8 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <div className="flex items-start">
            <div className="w-1/4 mr-4 flex-shrink-0" style={{ maxWidth: '150px' }}>
                  <div className="aspect-square border-4 border-yellow-300 overflow-hidden">
                  <img src={`${process.env.PUBLIC_URL}/Avatar.png`} alt="Harit Jewkaew" className="w-full h-full object-cover" />
                  </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2 text-green-400 flex items-center">
                <AlertCircle className="mr-2" /> Player Profile
              </h2>
              <p>Experienced backend software developer with expertise in Node.js, C#, and PHP, and a strong passion for game development. Skilled in creating efficient, scalable backend systems for interactive applications. Eager to learn new technologies and continuously improve my skills to deliver high-quality solutions in both software and game development projects.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-2 text-green-400 flex items-center">
            <Code className="mr-2" /> Contact Info
          </h2>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 text-yellow-300" />
            <span>061-360-7962</span>
          </div>
          <div className="flex items-center mb-2">
            <Mail className="mr-2 text-yellow-300" />
            <span>HaritJewkaew2546@gmail.com</span>
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="mr-2 text-yellow-300" />
            <span>179/1 Pangiew Village, Village No. 7, Muang, Rop Wiang, Chiang Rai, 57000</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 text-yellow-300" />
            <span>01/05/2003</span>
          </div>
        </section>

        <section className="mb-8 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-2 text-green-400 flex items-center">
            <Book className="mr-2" /> Education Quests
          </h2>
          <div className="mb-2">
            <h3 className="text-xl font-bold text-yellow-300">Software Engineering</h3>
            <p>2022 - 2024</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-300">CRMS 5 Denha Chiang Rai</h3>
            <p>Secondary School (Science-Computer), 2016 - 2021</p>
          </div>
        </section>

        <section className="mb-8 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-2 text-green-400 flex items-center">
            <Briefcase className="mr-2" /> Experience Levels
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-yellow-300">Backend Developer (Line) - Mae Chan Hospital</h3>
            <p className="text-sm">2024</p>
            <p>Developed a system for stretcher pushers using flex message line, responsible for back-end work and flex message line functions.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-yellow-300">Unity Game Developer</h3>
            <p className="text-sm">2021</p>
            <p>Developed a game with Unity 3D about everyday waste.</p>
          </div>
        </section>

        <section className="mb-8 bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-2 text-green-400 flex items-center">
            <Award className="mr-2" /> Skill Tree
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-yellow-300">Hard Skills</h3>
            {skills.map((skill, index) => (
              <SkillBar key={index} skill={skill.name} level={skill.level} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-yellow-300">Soft Skills</h3>
            <div className="flex flex-wrap">
              {softSkills.map((skill, index) => (
                <div key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full m-1">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-800 p-4 rounded-lg border-2 border-green-400">
          <h2 className="text-2xl font-bold mb-2 text-green-400">Language Settings</h2>
          <p><strong className="text-yellow-300">Thai:</strong> Native</p>
          <p><strong className="text-yellow-300">English:</strong> Intermediate (B1)</p>
        </section>
      </div>
    </div>
  );
};

export default GameDevResume;
