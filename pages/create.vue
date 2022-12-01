<template>
  <div class="bg-gray-100 py-2 min-h-screen flex flex-col items-center">
    <div class="pb-6 w-100 flex justify-start px-8 py-8 rounded-b-lg">
      <NuxtLink to="/">
        <img class="w-full max-w-xs" src="~/assets/logo.png" alt="ActionPoint">
      </NuxtLink>
    </div>
    <div class="my-6 p-4 py-8 bg-white rounded-xl shadow-xl border-2 border-solid border-gray-200">
      <div class="my-4 text-center">
        <h1 v-if="this.$route.params.project == null" class="text-2xl lg:text-3xl">Create project</h1>
        <h1 v-else class="text-2xl lg:text-3xl">Editing <span class="text-blue-600">{{this.$route.params.project.name}}</span></h1>
        <hr class="h-1 bg-blue-700 mt-4">
      </div>

      <form class="flex flex-col items-center font-bold bg-white rounded-md p-8">
        <label class="flex flex-col justify-center items-center">
          <span class="text-black opacity-50 text-lg">Name</span>
          <input type="text" class="shadow-lg border-2 border-blue-700 rounded-md m-4 block" placeholder="ex: Desert Storm" v-model="name">
        </label>
        <label class="flex flex-col justify-center items-center">
          <span class="text-black opacity-50 text-lg">Description</span>
          <textarea class="shadow-lg border-2 border-blue-700 rounded-md m-4 block" rows="4" cols="30" placeholder="ex: ammunition, vehicles, aircraft.." v-model="description" />
        </label>
        <div class="flex flex-col items-center space-y-2 my-8">
          <span class="text-black opacity-50 text-lg">Keywords</span>
          <div class="flex flex-wrap justify-center items-center max-w-2xl">
            <input v-for="(keyword, index) in keywords" :key="index" class="py-0 m-1 border-2 border-blue-700 rounded-md bg-blue-400 text-white text-center font-bold" :value="keyword" @blur="checkAtrribute($event, index, 'keyword')">
          </div>
          <input type="text" placeholder="Add new keyword.." class="py-0 border-2 border-blue-700 rounded-md mx-1 text-center font-bold" @blur="checkAtrribute($event, -1, 'keyword')">
        </div>
        <div class="flex flex-col items-center space-y-2 my-8">
          <span class="text-black opacity-50 text-lg">Attendees</span>
          <div v-if="this.attendees.length" class="flex flex-wrap justify-center items-center max-w-2xl">
            <input v-for="(attendee, index) in attendees" :key="index" class="py-0 m-1 border-2 border-blue-700 rounded-md bg-gray-300 text-center font-bold" :value="attendee" @blur="checkAtrribute($event, index, 'attendee')">
          </div>
          <input type="text" placeholder="Add new attendee.." class="py-0 border-2 border-blue-700 rounded-md mx-1 text-center font-bold" @blur="checkAtrribute($event, -1, 'attendee')">
        </div>
        
        <!-- <span>Meetings</span>
        <a href="#" @click="createMeeting()">New meeting</a>
        <div v-if="newMeeting">
          <input type="text" placeholder="keywords">
          <input type="text" placeholder="attendees">
          <input type="text" placeholder="file unput">
        </div>
        <div v-for="(meeting, index) in meetings" :key="index" class="m-2">
          <span>{{meeting}}</span>
        </div> -->
        <div class="pt-8">
          <button type="submit" v-if="this.$route.params.project != null" class="px-8 py-4 border-2 border-yellow-400 text-xl hover:bg-yellow-400 rounded-xl" @click="editProject">Modify</button>
          <button type="submit" v-else class="px-8 py-4 border-2 border-green-400 text-xl hover:bg-green-400 rounded-xl" @click="createProject">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      newMeeting: false,
      name: "",
      description: "",
      attendees: [],
      keywords: [],
      meetings: null,
      chats: null,
      emails: null
    }
  },
  created() {
    if(this.$route.params["project"]) {
      const project = this.$route.params["project"]
      this.id = project._id.$oid
      this.name = project.name
      this.description = project.description
      this.attendees = project.attendees
      this.keywords = project.keywords
      // this.meetings = project.meetings
      // this.chats = project.chats
      // this.emails = project.emails
    }
  },
  methods: {
    createProject() {
      const data = {
        name: this.name,
        description: this.description,
        keywords: this.keywords,
        attendees: this.attendees
      }
      fetch(process.env.baseApiUrl + "/create",{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Authorization": "Bearer " + JSON.parse(this.getCookie("authentication-cookie")).auth.access_token
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .catch((error) => {
        console.error(error)
      })

      this.$router.push("/")
    },
    editProject() {
      const data = {
        id: this.id,
        name: this.name,
        description: this.description,
        keywords: this.keywords,
        attendees: this.attendees
      }
      fetch("http://127.0.0.1:5000/update/" + this.id,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log("toast project " + data.name + " updated")
      })
      .catch((error) => {
        console.error(error)
      })
      this.$router.push("/")
    },
    checkAtrribute($event, index, type) {
      if(index == -1) {   //new attribute input is target
        if($event.target.value != "" && $event.target.value != " ") {
          switch(type) {
            case "keyword":
              this.keywords.push($event.target.value)
              break
            case "attendee":
              this.attendees.push($event.target.value)
              break
          }
        }
        $event.target.value = ""
      }
      else {    //existing attribute input is target
        if($event.target.value == "" || $event.target.value == " ") {
          switch(type) {
            case "keyword": {
              if(index == 0) {
                this.keywords.shift()
                break
              }
              this.keywords.splice(index, 1) 
            }
            case "attendee": {
              if(index == 0) {
                this.attendees.shift()
                break
              }
              this.attendees.splice(index, 1) 
            }
          } 
        }
        else {      //edit attribute
          switch(type) {
            case "keyword":
              this.keywords[index] = $event.target.value 
              break
            case "attendee": 
              this.attendees[index] = $event.target.value
              break
          } 
        }
      }
    },
    getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
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

<style>

</style>