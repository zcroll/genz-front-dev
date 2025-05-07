<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Career How To Become Test</h1>

    <div class="mb-6">
      <button
        @click="toggleDataType"
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Toggle Data Type: {{ isStructured ? 'Structured' : 'Simple' }}
      </button>
    </div>

    <CareerHowToBecome
      :howToBecome="currentData"
      :isLoading="isLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CareerHowToBecome from '@/components/Careers/Detail/CareerHowToBecome.vue';
import type { CareerHowToBecome as CareerHowToBecomeType } from '@/types/career';

const isLoading = ref(false);
const isStructured = ref(true);

// Toggle between structured and simple data
const toggleDataType = () => {
  isStructured.value = !isStructured.value;
};

// Sample structured data (Actor)
const structuredData = ref<CareerHowToBecomeType>({
  id: 26,
  name: "Actor",
  education_level: "No Education",
  degrees: [
    {
      id: 204,
      name: "Acting",
      slug: "acting-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1623447222/yzarwfyzoyhxnkineeec.jpg"
    },
    {
      id: 460,
      name: "Theatre Arts",
      slug: "theatre-arts-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1717945995/gm6gb6qtbssw8fu0q2na.jpg"
    }
  ],
  education_levels: [
    {
      level: "No education",
      description: ""
    },
    {
      level: "High school diploma",
      description: ""
    },
    {
      level: "Certificate or associate degree",
      description: ""
    },
    {
      level: "Bachelor's degree",
      description: ""
    },
    {
      level: "Master's degree",
      description: ""
    },
    {
      level: "Doctorate",
      description: ""
    }
  ],
  steps: [
    {
      number: 1,
      title: "",
      content: "Auditioning: Actors must regularly attend auditions to compete for roles in theater productions, films, television shows, commercials, and other projects. This involves preparing audition materials, such as monologues or scenes, and showcasing their acting abilities to casting directors, producers, and other decision-makers.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 2,
      title: "",
      content: "Rehearsing: Once cast in a role, actors are responsible for attending rehearsals and collaborating with directors, fellow cast members, and production staff to develop their characters and stage or screen performances. This may involve memorizing lines, blocking scenes, practicing choreography, and fine-tuning their delivery to achieve the desired artistic vision.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 3,
      title: "",
      content: "Performing: The primary responsibility of an actor is to deliver compelling and authentic performances that engage and entertain audiences. Whether on stage or screen, actors bring characters to life through their interpretation of scripts, emotional depth, and physical expression, captivating viewers and eliciting emotional responses.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 4,
      title: "",
      content: "Continual Training: To stay competitive and hone their craft, actors often pursue ongoing training and professional development opportunities. This may include attending acting classes, workshops, and seminars to refine their skills, learn new techniques, and expand their range as performers.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 5,
      title: "",
      content: "Promoting Projects: In addition to their artistic responsibilities, actors may be required to participate in promotional activities to help generate buzz and publicity for projects in which they are involved. This may include interviews, press events, social media promotion, and other marketing initiatives to attract audiences and enhance visibility.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 6,
      title: "",
      content: "Networking: Building relationships within the entertainment industry is essential for actors to advance their careers and secure future opportunities. Actors often attend industry events, networking mixers, and professional gatherings to connect with agents, casting directors, producers, and fellow performers, fostering collaborations and cultivating professional connections.",
      sub_steps: [],
      html_id: null
    }
  ],
  path_overview: "Becoming an actor requires a combination of talent, training, and perseverance. While formal education is not always necessary, many actors benefit from studying acting techniques, voice, movement, and other performance skills. The path to becoming an actor often involves auditioning for roles, building a portfolio of work, and networking within the industry. Success in acting typically comes from a combination of skill, dedication, and sometimes a bit of luck in landing breakthrough roles.",
  path_structure_type: "SIMPLE_STRUCTURE",
  page_type: "structured",
  resources: []
});

// Sample simple data (Film Director)
const simpleData = ref<CareerHowToBecomeType>({
  id: 430,
  name: "Film Director",
  education_level: "Bachelor's",
  degrees: [
    {
      id: 206,
      name: "Screenwriting",
      slug: "screenwriting-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1626285813/fvzqr31een7utahxdryl.jpg"
    },
    {
      id: 276,
      name: "Cinema Studies",
      slug: "cinema-studies-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1729024662/ciwxjsu1e65c7okgd3cx.jpg"
    },
    {
      id: 1212,
      name: "Film Production",
      slug: "film-production-degree",
      image_url: "https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,h_160,q_80,w_160/v1729031154/wzupqhnds24ngmpxbvip.jpg"
    }
  ],
  education_levels: [
    {
      level: "Bachelor's degree",
      description: ""
    },
    {
      level: "Master's degree",
      description: ""
    },
    {
      level: "Doctorate",
      description: ""
    }
  ],
  steps: [
    {
      number: 1,
      title: "",
      content: "Interpreting the Script: Directors thoroughly analyze the screenplay, understanding the story's themes, characters, and overall tone. They develop a vision for how the story will be visually and emotionally conveyed on screen.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 2,
      title: "",
      content: "Casting: Directors work closely with casting directors to select actors for the film. They conduct auditions, make casting decisions, and provide guidance to actors to achieve the desired performances.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 3,
      title: "",
      content: "Rehearsing and Directing Actors: Directors guide actors during rehearsals and on set, helping them understand their characters and motivations. They provide feedback, direction, and support to elicit authentic and compelling performances.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 4,
      title: "",
      content: "Collaborating with the Crew: Directors collaborate with various departments, including cinematography, production design, costume, and sound. They communicate their vision to the crew members, ensuring that everyone works cohesively to achieve the desired visual and auditory elements.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 5,
      title: "",
      content: "Shot Composition and Blocking: Directors work closely with cinematographers to plan the framing, composition, and movement of each shot. They decide on camera angles, movements, and blocking (actors' positions and movements within the frame) to visually tell the story.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 6,
      title: "",
      content: "Decision-Making During Production: Directors make real-time decisions on set, including adjusting performances, altering scenes, and addressing technical challenges. They must stay adaptable and decisive to keep the production on track.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 7,
      title: "",
      content: "Post-Production Involvement: While film editing is primarily the editor's domain, directors play a significant role in the editing process. They review the footage, provide feedback to the editor, and collaborate on the final cut to ensure the film aligns with their vision.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 8,
      title: "",
      content: "Sound and Music Direction: Directors work with sound designers and composers to create the film's auditory atmosphere. They provide guidance on the use of music, sound effects, and dialogue to enhance emotional impact and storytelling.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 9,
      title: "",
      content: "Ensuring Continuity: Directors are responsible for maintaining continuity in scenes, ensuring that details like actors' positions, props, and lighting remain consistent throughout the film.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 10,
      title: "",
      content: "Leadership and Communication: Directors must effectively lead the cast and crew, fostering a collaborative and creative working environment. Clear communication and motivational skills are essential to inspire and guide the team toward the common goal of bringing the story to life.",
      sub_steps: [],
      html_id: null
    },
    {
      number: 11,
      title: "",
      content: "Promotion and Public Relations: After the film is completed, directors often participate in promotional activities, interviews, and film festivals to promote their work and engage with the audience.",
      sub_steps: [],
      html_id: null
    }
  ],
  path_overview: "The journey to becoming a film director typically involves a combination of education, hands-on experience, and networking. While a formal degree in film production or a related field can provide valuable knowledge and skills, practical experience is equally important. Many successful directors start by working in various roles on film sets, creating short films or independent projects, and gradually building their portfolio and reputation within the industry.",
  path_structure_type: "SIMPLE_STRUCTURE",
  page_type: "simple",
  resources: []
});

// Computed property to determine which data to display
const currentData = computed(() => {
  return isStructured.value ? structuredData.value : simpleData.value;
});
</script>
