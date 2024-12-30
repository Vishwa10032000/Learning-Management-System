
import Image1 from "../assets/Learnings/work.png";
import Image2 from "../assets/Learnings/data.png";
import Image3 from "../assets/Learnings/employee.png";
import Image4 from "../assets/Learnings/navigating.png";
import Image5 from "../assets/Learnings/speak.png";
import Image6 from "../assets/Learnings/problem.png";
import Image7 from "../assets/Learnings/team.png";
import Image8 from "../assets/Learnings/time.png";


import policyTemplate from '../assets/PolicyTemplate.pdf';
import VideoTemplate from '../assets/SampleVideo.mp4';

const LibraryData = {

  courses: [
    {
      id: 1,
      title: "Workplace Ethics and Policy Guidelines",
      description: `<p><strong>Gain a deep understanding of workplace ethics</strong> with this comprehensive course on organizational policies and guidelines. This course is tailored to ensure employees can navigate their professional responsibilities effectively while adhering to the organization's code of ethics. </p>
      <p>You'll learn about essential policies, including <u>harassment prevention</u>, <u>conflict resolution strategies</u>, and <u>inclusive work practices</u>. Each module is enriched with real-life examples and case studies to help you apply these principles in practical scenarios. By the end of the course, you'll be equipped to make informed decisions that foster a positive and compliant workplace culture.</p>`,
            instructor: "Policy Team",
            rating: 4.8,
            reviews: 240,
            enrolled: 1800,
            thumbnailImage: Image1,
            date: "2024-12-10T05:30:05Z",
            category: "Policies",
            document: policyTemplate
          },
          {
            id: 2,
            title: "Data Protection and Privacy Policies",
            description: `<p><strong>Master the art of safeguarding data</strong> and ensuring compliance with privacy regulations. This course delves into the organization's data protection policies, including secure data handling, recognizing breaches, and understanding global privacy laws like GDPR and HIPAA. </p>
      <p>Interactive lessons will guide you through creating a secure workspace, identifying potential risks, and following best practices for data management. By completing this course, you'll contribute to maintaining the integrity and confidentiality of organizational and client information.</p>`,
            instructor: "Policy Team",
            rating: 4.9,
            reviews: 190,
            enrolled: 2000,
            thumbnailImage: Image2,
            date: "2024-11-15T14:10:04Z",
            category: "Policies",
            document: policyTemplate
          },
          {
            id: 3,
            title: "Employee Onboarding and Culture Overview",
            description: `<p><strong>Welcome to the team!</strong> This course is your gateway to understanding the organization's culture, values, and expectations. Designed for new employees, this orientation program offers a detailed walkthrough of the workplace, departmental roles, and key organizational goals.</p>
      <p>Interactive sessions and quizzes will help you familiarize yourself with company policies and the work environment. By the end of this course, you’ll feel confident and prepared to contribute to our collaborative and innovative culture.</p>`,
            instructor: "Orientation Team",
            rating: 4.7,
            reviews: 150,
            enrolled: 1700,
            thumbnailImage: Image3,
            date: "2024-12-01T15:30:45.132+00:00",
            category: "Orientations",
            document: "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx"
          },
          {
            id: 4,
            title: "Navigating Company Resources and Tools",
            description: `<p><strong>Explore the full suite of resources and tools</strong> available at your fingertips. This orientation course is designed to make your transition into the organization seamless. From accessing your online portals to utilizing team collaboration tools, this course covers it all.</p>
      <p>Through step-by-step tutorials, you will learn to use essential platforms effectively, manage tasks efficiently, and connect with team members. Whether you're tech-savvy or new to these tools, this course will make you an expert in no time.</p>`,
            instructor: "Orientation Team",
            rating: 4.6,
            reviews: 180,
            enrolled: 1600,
            thumbnailImage: Image4,
            date: "2024-11-25T10:00:43.209+00:00",
            category: "Orientations",
            document: "https://scholar.harvard.edu/files/torman_personal/files/samplepptx.pptx"
          },
          {
            id: 5,
            title: "Mastering Public Speaking for Professionals",
            description: `<p><strong>Sharpen your communication skills</strong> with this training course dedicated to enhancing your public speaking abilities. Learn how to engage your audience, deliver impactful presentations, and handle Q&A sessions with confidence.</p>
      <p>Featuring role-play exercises, real-world scenarios, and expert insights, this course will transform you into a compelling speaker. Whether you’re addressing a small team or a large conference, you’ll leave a lasting impression every time.</p>`,
            instructor: "Training Team",
            rating: 4.8,
            reviews: 200,
            enrolled: 1900,
            thumbnailImage: Image5,
            date: "2024-12-12T15:30:45.132+00:00",
            category: "Trainings",
            document: VideoTemplate
          },
          {
            id: 6,
            title: "Advanced Problem-Solving Techniques",
            description: `<p><strong>Unlock your problem-solving potential</strong> with this in-depth training program. Dive into advanced techniques like root cause analysis, decision trees, and critical thinking exercises to tackle challenges efficiently.</p>
      <p>By working through case studies and group activities, you'll gain the confidence to address complex issues, identify innovative solutions, and implement them effectively. This course is essential for professionals aspiring to leadership roles.</p>`,
            instructor: "Training Team",
            rating: 4.7,
            reviews: 250,
            enrolled: 2100,
            thumbnailImage: Image6,
            date: "2024-11-30T10:00:43.209+00:00",
            category: "Trainings",
            document: VideoTemplate
          },
          {
            id: 7,
            title: "Leadership and Team Management",
            description: `<p><strong>Lead with impact</strong> by mastering the art of team management and leadership. This comprehensive training course covers everything from building trust to resolving conflicts and motivating your team towards shared goals.</p>
      <p>Interactive workshops, practical scenarios, and expert guidance ensure you develop the skills required to manage diverse teams and drive organizational success. This course is a must-have for aspiring and current leaders.</p>`,
            instructor: "Training Team",
            rating: 4.9,
            reviews: 300,
            enrolled: 2200,
            thumbnailImage: Image7,
            date: "2024-12-15T15:30:45.132+00:00",
            category: "Trainings",
            document: VideoTemplate
          },
          {
            id: 8,
            title: "Time Management and Productivity Mastery",
            description: `<p><strong>Boost your efficiency and productivity</strong> with this hands-on training course. Learn to prioritize tasks, set realistic goals, and use time-blocking techniques to optimize your day.</p>
      <p>With actionable strategies, this course will help you reduce procrastination, maintain focus, and achieve work-life balance. Perfect for anyone looking to get more done in less time while reducing stress.</p>`,
            instructor: "Training Team",
            rating: 4.8,
            reviews: 220,
            enrolled: 2000,
            thumbnailImage: Image8,
            date: "2024-12-20T10:00:43.209+00:00",
            category: "Trainings",
            document: VideoTemplate
          }
        ]
      
};

export default { LibraryData };

