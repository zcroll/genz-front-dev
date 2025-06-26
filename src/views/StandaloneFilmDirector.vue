<template>
  <div class="min-h-screen bg-white p-8">
    <h1 class="text-4xl font-bold mb-6">FILM DIRECTOR CAREER PAGE (STANDALONE)</h1>
    
    <div class="container mx-auto py-8 px-4">
      <!-- Breadcrumb navigation -->
      <nav class="text-sm mb-6">
        <ol class="flex items-center space-x-2">
          <li><router-link to="/careers" class="hover:underline">Careers</router-link></li>
          <li class="flex items-center">
            <span class="mx-2">/</span>
            <a href="#" class="hover:underline">Film & Television</a>
          </li>
          <li class="flex items-center">
            <span class="mx-2">/</span>
            <span class="font-medium">Film Director</span>
          </li>
        </ol>
      </nav>

      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-2">What does a film director do?</h1>
        <div class="flex items-center">
          <span class="bg-blue-500 text-white px-2 py-1 rounded-md">
            80% Match?
          </span>
        </div>
      </div>

      <!-- Career content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left sidebar with career summary -->
        <div class="lg:col-span-1">
          <div class="bg-white border rounded-xl shadow-sm p-6 sticky top-8">
            <div class="flex items-center space-x-4 mb-4">
              <img
                src="https://res.cloudinary.com/hnpb47ejt/image/upload/c_fill,f_auto,h_240,q_auto,w_240/v1680280184/exo1wqdugv3ycabotcfh.jpg"
                alt="Film Director"
                class="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 class="text-xl font-bold">Film Director</h2>
                <div>
                  <span class="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                    80% Match?
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <!-- Career test CTA -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm mb-3">
                  <strong>Would you make a good film director?</strong> Take our career test and find your match with over 800 careers.
                </p>
                <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                  Take the free career test
                </button>
                <p class="text-xs text-center mt-2 text-gray-500">
                  <a href="#" class="hover:underline">Learn more about the career test</a>
                </p>
              </div>

              <!-- Key Stats -->
              <div class="space-y-3">
                <!-- Salary -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-sm font-medium">Avg Salary</span>
                  </div>
                  <div class="text-sm">$33/hr</div>
                </div>

                <!-- Job Market -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span class="text-sm font-medium">Job Market</span>
                  </div>
                  <div class="text-sm">7%</div>
                </div>

                <!-- Education -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    <span class="text-sm font-medium">Education</span>
                  </div>
                  <div class="text-sm">Bachelor's</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main content area -->
        <div class="lg:col-span-2">
          <!-- What is a Film Director section -->
          <div id="what-is" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">What is a Film Director?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              A film director is a key creative figure in the filmmaking process, responsible for guiding and overseeing the artistic and technical elements of a movie. Directors play a central role in translating the screenplay into a visual narrative, making important decisions about the film's style, tone, pacing, and overall artistic vision. They work closely with the production team, including cinematographers, actors, editors, and production designers, to bring the script to life on screen.
            </p>
          </div>

          <!-- What does a Film Director do section -->
          <div id="what-does" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">What does a Film Director do?</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Film directors are multifaceted professionals who blend artistic vision, technical expertise, and leadership skills to oversee all aspects of filmmaking, from pre-production planning to post-production editing, ensuring the creation of a cohesive and impactful cinematic experience.
            </p>
            
            <h3 class="text-xl font-semibold mb-3">Duties and Responsibilities</h3>
            <p class="text-gray-700 mb-4">Here are the key duties and responsibilities of a film director:</p>
            
            <ul class="list-disc list-inside space-y-2 mb-6 pl-4">
              <li class="text-gray-700">Interpreting the Script: Directors thoroughly analyze the screenplay, understanding the story's themes, characters, and overall tone. They develop a vision for how the story will be visually and emotionally conveyed on screen.</li>
              <li class="text-gray-700">Casting: Directors work closely with casting directors to select actors for the film. They conduct auditions, make casting decisions, and provide guidance to actors to achieve the desired performances.</li>
              <li class="text-gray-700">Rehearsing and Directing Actors: Directors guide actors during rehearsals and on set, helping them understand their characters and motivations. They provide feedback, direction, and support to elicit authentic and compelling performances.</li>
            </ul>
          </div>

          <!-- Personality section -->
          <div class="mb-8 bg-white border rounded-xl shadow-sm p-6">
            <h2 class="text-2xl font-bold mb-4">Are you suited to be a film director?</h2>
            <p class="text-gray-700 mb-4">
              Film directors have distinct personalities. They tend to be artistic individuals,
              which means they're creative, intuitive, sensitive, articulate, and expressive.
              They are unstructured, original, nonconforming, and innovative. Some of them are also
              enterprising, meaning they're adventurous, ambitious, assertive, extroverted,
              energetic, enthusiastic, confident, and optimistic.
            </p>
            <p class="mb-4">Does this sound like you? Take our free career test to find out if film director is one of your top career matches.</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
                Take the free test now
              </button>
              <button class="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-lg">
                Learn more about the career test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-8 text-center">
      <router-link to="/" class="text-blue-500 hover:underline">Back to Home</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Standalone Film Director Career page
</script>
