<template>
  <div class="bg-gray-100 py-2">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="min-h-screen">
        <div class="pb-6 w-100 flex justify-between px-8 py-8 rounded-b-lg">
          <img class="w-full max-w-xs" src="~/assets/logo.png" alt="ActionPoint">
           <div class="flex flex-row justify-center items-center space-x-4">
            <span class="text-2xl">Aloha, <span class="font-bold">{{ username }}</span>!</span>
            <div @click="logout" class="cursor-pointer px-4 py-2 bg-red-500 text-white font-bold rounded-full">Logout</div>
          </div>
        </div>
        <div class="flex flex-wrap items-start">
          <div class="w-full mt-8 px-4 order-1" :class="currentProject && currentProject.meetings.length ? 'md:w-1/5' : 'md:w-3/5'">
            <div class="flex flex-row justify-between mb-4">
              <h1 class="text-2xl lg:text-3xl">Projects</h1>
              <NuxtLink to="/create" type="button" class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg class="w-4 h-4 lg:h-5 lg:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
            <ul role="list" class="mt-3 grid grid-cols-1 gap-5">
              <li v-for="(project, index) in projects" :key="index" class="col-span-1 flex shadow-sm rounded-md group">
                <div class="flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md" :class="getProjectColor(index)">
                  {{ project.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1),'') }}
                </div>
                <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate group-hover:bg-gray-50" :class="currentProject && project.name == currentProject.name ? 'bg-blue-100' : ''">
                  <div class="flex-1 px-4 py-2 text-sm truncate cursor-pointer" @click="selectProject($event, project.name)">
                    <a href="#" class="text-gray-900 font-medium hover:text-gray-600">{{ project.name }}</a>
                    <p class="text-gray-500 truncate">{{ project.description }}</p>
                  </div>
                  <div class="m-4 p-2">
                    <svg @click="editProject(index)" class="inline cursor-pointer mb-1 mx-1 w-5 transform hover:scale-110" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="028---Coloured-Pencil" fill="rgb(0,0,0)" fill-rule="nonzero"><path id="Shape" d="m37.381 3.062c1.2207502-.58548714 2.6762453-.35630038 3.658.576.9390562.98619475 1.1703464 2.45036916.581 3.678l-31.42 31.419c-.32511253-2.1939403-2.04185317-3.9200067-4.234-4.257z"/><path id="Shape" d="m47.3 12.94-31.441 31.436c-.3320279-2.1870828-2.0488389-3.9034885-4.236-4.235l31.437-31.436c1.2155936-.6078953 2.6837538-.37013899 3.6453629.59033615.9616092.96047515 1.2010977 2.42835375.5946371 3.64466385z"/><path id="Shape" d="m1.171 55.985c-.32329334.055683-.65333752-.0507433-.88320188-.2847979-.22986437-.2340546-.33031168-.5659673-.26879812-.8882021l.681-4.433c1.18520301.3028582 2.2657494.9222885 3.126 1.792.87107224.8608776 1.49155769 1.9424926 1.795 3.129z"/><path id="Shape" d="m17.233 53.5-9.624 1.49c-.37308438-1.6061263-1.19340297-3.0737546-2.366-4.233-1.15921198-1.1726409-2.62685381-1.9929671-4.233-2.366l1.49-9.624c.15163785-.7975088.58019655-1.5157873 1.21-2.028 1.2198302-.5849799 2.67419993-.3557824 3.655.576.95428456 1.0206965 1.16809197 2.5293375.535 3.775-.20594307.3870332-.13577323.8630791.17308318 1.1742301.30885641.3111511.78436986.3848426 1.17291682.1817699 1.2462801-.6355962 2.7570717-.4233659 3.78.531.9537783 1.0206046 1.1671864 2.5288487.534 3.774-.2061784.3874047-.1356804.8639667.1738309 1.1750852.3095112.3111185.7857017.3840839 1.1741691.1799148 1.2456658-.6352592 2.7557086-.4230218 3.778.531.9341031.9830018 1.1626345 2.441382.574 3.663-.5135628.6258809-1.2312601 1.0507633-2.027 1.2z"/><path id="Shape" d="m20.1 47.222c-.7608792-.7733981-1.7555878-1.2742673-2.83-1.425l31.414-31.417c1.2171322-.6251157 2.698435-.3947368 3.6682285.5704994.9697936.9652362 1.2071472 2.4454374.5877715 3.6655006l-31.419 31.418c-.1506789-1.0683668-.6502557-2.0569734-1.421-2.812z"/><path id="Shape" d="m55.194 16.346c-.1537051-1.0639379-.6530187-2.0478072-1.421-2.8-1.1014064-1.1115871-2.6580246-1.6462355-4.21-1.446.1921248-1.5521143-.3421076-3.10611899-1.4479943-4.21200568-1.1058867-1.10588668-2.6598914-1.6401191-4.2120057-1.44799432.1997386-1.55289907-.3356228-3.11017969-1.448-4.212-.751672-.76834259-1.7359046-1.26713761-2.8-1.419 1.1799454-1.09380356 3.012669-1.06203753 4.154.072l11.312 11.311c1.1430927 1.1373382 1.1754253 2.9772003.073 4.154z"/></g></g></svg>
                    <svg @click="deleteProject(index)" class="inline cursor-pointer mb-1 mx-1 w-6 transform hover:scale-110" viewBox="-57 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/><path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/><path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/></svg>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="w-full px-4 mt-8 order-3 md:order-2" :class="currentProject && currentProject.meetings.length ? 'md:w-2/5' : 'md:w-2/5'">
            <h1 class="text-2xl lg:text-3xl mb-4">Details</h1>
            <div v-if="currentProject" class="p-4 border rounded-lg mb-1 bg-blue-100">
              <div class="p-1 m-1">
                <h2 class="text-md font-bold">{{currentProject.name}}</h2>
                <p class="text-sm">{{currentProject.description}}</p> 
              </div>
              <div class="p-1 m-1">
                <h1 class="text-sm inline text-black text-opacity-50">Keywords</h1>
                <span v-for="(keyword, index) in currentProject.keywords" :key="index" class="m-2 rounded-md border border-blue-400 bg-white text-blue-400 py-1 px-2 text-sm">
                  {{ keyword }}
                </span>
              </div>
              <div class="p-1 m-1">
                <h1 class="text-sm inline text-black text-opacity-50">Attendees</h1>
                <span v-for="(attendee, index) in currentProject.attendees" :key="index" class="m-2 rounded-md border border-blue-400 bg-white text-blue-400 py-1 px-2 text-sm">
                  {{ attendee }}
                </span>
              </div>
            </div>
            <h1 v-if="currentProject && currentProject.meetings.length" class="text-2xl mb-2 mt-4">{{currentProject.name}} meetings</h1>
            <div v-if="currentProject && currentProject.meetings.length" class="rounded-lg bg-gray-100 overflow-hidden shadow divide-y space-y-2 divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
              <div v-for="(meeting, index) in currentProject.meetings" :key="index"
                class="flex flex-row justify-between items-center rounded relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 cursor-pointer border-t"
                @click="meetingClicked($event, meeting, index)"
                :class="currentMeetingIndex == index ? 'bg-blue-100' : ''"
                >

                <div class="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 flex flex-row justify-start items-center">
                  <svg class="h-6 w-6 m-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="ml-2 text-blue-700 font-bold text-sm px-2 border-l-2 border-blue-700">
                    <p class="">{{ meeting.date }}</p>
                  </div>
                </div>
                <div>
                  <span class="text-md">Subject {{ index }}</span>
                </div>
                <div class="flex flex-wrap justify-start items-center space-x-2">
                  <span v-for="attendee in meeting.attendees" :key="attendee" class="rounded-md border border-blue-400 bg-white text-blue-400 px-2 py-1 mt-1 text-sm">
                    {{ attendee }}
                  </span>
                </div>
                <span class="pointer-events-none absolute top-3 right-3 text-gray-300 group-hover:text-gray-400" aria-hidden="true">
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            </div>
            <div v-else-if="!currentProject" type="button" class="bg-white relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900">
                Click on an existing project to see meetings
              </span>
            </div>
            <div v-else type="button" class="bg-white relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray-900">
                This project does not have any scheduled meetings
              </span>
            </div>
          </div>
          <div class="w-full md:w-2/5 px-4 mt-8 order-2 md:order-3" v-if="currentProject && currentProject.meetings.length && !preview">
            <h1 class="text-2xl lg:text-3xl mb-4">Hints</h1>
            <div class="bg-white relative block w-full border-2 border-blue-300 border-dashed rounded-lg p-4 text-center hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <p class="text-left">- If you want a preview of a meeting, click on it once</p>
              <p class="text-left">- If you want to go into the meeting, click on it twice</p>
            </div>
          </div>
          <div class="w-full md:w-2/5 px-4 mt-8 order-2 md:order-3" v-else-if="preview">
            <h1 class="text-2xl lg:text-3xl mb-4">Preview</h1>
            <div class="relative block w-full border-2 border-gray-300 border rounded-lg p-4 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-white">
              <h3 class="text-lg font-medium text-left">
              <span class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Duration <br>&nbsp;<span class="font-light">{{ preview.duration }}</span>
              </span>
              </h3>
              <h3 class="text-lg font-medium text-left mt-4">
              <span class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true"></span>
                Attendees 
              </span>
              </h3>
              <div class="flex flex-wrap justify-start items-center mt-2 space-x-2">
                <span v-for="attendee in preview.attendees" :key="attendee + '-preview-attendee'" class="mt-2 rounded-md border border-blue-400 bg-white text-blue-400 py-1 px-2 text-sm">
                  {{ attendee }}
                </span>
              </div>
              <h3 class="text-lg font-medium mt-4 text-left">
                <span class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Keywords
                </span>
              </h3>
              <div class="flex flex-wrap justify-start items-center mt-2 space-x-2">
                <span v-for="keyword in preview.keywords" :key="keyword + '-preview-keyword'" class="mt-2 rounded-md border border-blue-400 bg-white text-blue-400 py-1 px-2 text-sm">
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: "ActionPoint - Dashboard",
      projects: null,
      delay: 500,
      clicks: 0,
      timer: null,
      currentMeeting: null,
      currentMeetingIndex: null,
      availableColors: ['red', 'green', 'blue', 'pink', 'indigo'],
      preview: null
    }
  },
  created() {
    this.getProjectsFromApi()
  },
  computed: {
    ...mapGetters({
      currentProject: 'menu/getProject',
      username: 'auth/getUsername'
    }),
  },
  methods: {
    ...mapActions({
      setProject: 'menu/setProject',
      setMeeting: 'menu/setMeeting',
      logout: 'auth/logout'
    }),
    getProjectsFromApi(){
      fetch('http://actionpoint.vps.webdock.cloud:5000/list', {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + JSON.parse(this.getCookie("authentication-cookie")).auth.access_token
        }
      })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.projects = data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    editProject(index) {
      let project = this.projects[index]
      this.$router.push({ name: 'create', params: { project: project }})
    },
    async deleteProject(index) {
      let id = this.projects[index]._id.$oid
      await fetch("http://actionpoint.vps.webdock.cloud:5000/delete/" + id, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
          "Authorization": "Bearer " + JSON.parse(this.getCookie("authentication-cookie")).auth.access_token
        }
      })
      .then(() => {
        console.log("toast project" + this.projects[index].name + " deleted")
      })
      .catch((error) => {
        console.log(error)
      })
      this.getProjectsFromApi()
    },
    getProjectColor(index) {
      return 'bg-' + this.availableColors[index] + '-600';
    },
    selectProject($event, projectName) {
      this.setProject(this.projects.find(project => project.name == projectName))
      this.setMeeting(null)
      this.preview = null
    },
    meetingClicked(event, meeting, index) {
      this.currentMeetingIndex = index
      this.preview = null
      this.clicks++ 
      if(this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.preview = meeting
          this.clicks = 0
        }, this.delay);
      } else{
          this.setMeeting(meeting)
          this.$router.push({ path: `projects/${(this.currentProject.name)}/meetings/${index}` })

          clearTimeout(this.timer);  
          this.clicks = 0;
      }        	
    },
	getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
      c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);		
		}
	return "";
	 }	
  }
 }
}
</script>
