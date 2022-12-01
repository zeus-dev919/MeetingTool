<template>
  <div class="h-screen overflow-hidden context">
    <!-- main container -->
    <div class="flex flex-row w-full h-full">
      <div class="flex flex-col items-center pt-5 bg-white">
        <div class="pb-6 mt-8 mb-4 border-b-2">
          <img class="w-48" src="~/assets/logo.png" alt="ActionPoint">
        </div>
        <NuxtLink to="/projects" class="font-bold text-black text-opacity-25">Back to Dashboard</NuxtLink>
        <div class="mt-8 flex flex-col items-center overflow-y-auto">
          <div class="bg-white" aria-label="Sidebar">
            <div class="pb-6 mb-2 space-y-3">
              <div class="flex justify-center pb-4">
                <span class="text-lg text-black font-bold text-opacity-50">Meetings</span>
              </div>            
              <div class="my-2 flex flex-row items-center">
                <input id="upload-json" type="file" @change="loadJsonFile" hidden>
                <label for="upload-json" class="flex items-center justify-center w-64 h-12 cursor-pointer bg-gradient-to-r from-ap-purple to-green-400 hover:from-ap-purple hover:to-blue-500 text-white text-center font-bold p-2 mx-2 rounded-md">
                  Upload meeting file
                </label>
              </div>
              <button @click="displayMeetings = !displayMeetings" class="w-64 h-12 relative inline-block cursor-pointer bg-gradient-to-r from-ap-purple to-green-400 hover:from-ap-purple hover:to-blue-500 text-white text-center font-bold p-2 mx-2 rounded-md focus:outline-none">
                Load existing meeting
              </button>
              <div class="rounded-md bg-white shadow-xs">
                <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <div v-if="displayMeetings">
                    <span v-for="(meeting, index) in project.meetings" :key="index" @click="changeMeeting(meeting)" class="block px-4 py-2 text-sm text-center leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer" role="menuitem">{{ meeting.date }}</span>
                    <span class="block px-4 py-2 mb-0 text-sm leading-5 text-gray-700 hover:bg-red-400 hover:text-gray-900 focus:outline-none cursor-pointer text-center font-bold" @click="displayMeetings = !displayMeetings">Close</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="sections.length" class="py-6 my-2 space-y-3">
              <div class="flex justify-center pb-4">
                <span class="text-lg text-black font-bold text-opacity-50">Share</span>
              </div>
              <button class="w-64 h-12 cursor-pointer transition duration-500 ease-in-out border border-transparent text-white text-center font-bold p-2 mx-2 rounded-md bg-blue-600 hover:bg-white hover:text-blue-800 hover:border-blue-800 focus:outline-none">
                Send minute to participants
              </button>
               <button class="flex flex-row py-8 justify-center items-center w-64 h-12 transition duration-500 ease-in-out font-bold px-2 ml-2 rounded-md border focus:outline-none hover:text-blue-700 hover:bg-white border-blue-700 bg-blue-600 text-white focus:ring-blue-800">
                Create Follow-Up Items
                <br>
                <img src="~/assets/jira_logo.png" class="px-1 w-16 self-center">
              </button>
            </div>
            <div v-if="sections.length" class="py-6 my-2 space-y-3">
              <div class="flex justify-center pb-4">
                <span class="text-lg text-black font-bold text-opacity-50">API Params</span>
              </div>
              <div class="mb-2 flex flex-col">
                <span class='text-center text-blue-600 font-bold'>Temperature</span>
                <vue-slider class="mx-8" v-model="temperature" v-bind="options={
                    min: 0,
                    max: 1,
                    interval: 0.1,
                    adsorb: true,
                    'tooltip-placement': 'bottom'
                  }"
                />
              </div>
              <div class="flex flex-col items-center space-y-1">
                <span class="font-bold mr-2 text-blue-600">Shots</span>
                <input type="number" placeholder="Shots" ref="shots" min="0" value="3" class="p-2 font-bold focus:ring-blue-800 focus:border-blue-600 border-blue-600 rounded-md w-24">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ATTENDEES/ITEMS/KEYWORDS -->
      <div class="md:w-3/5 border-transparent border-2 p-4 rounded-tl bg-gray-50 border-t border-r border-gray-200 pt-8">
        <div class="flex flex-col parent2">
          <div class="child2 space-y-8">
            <div>
              <h2 class="my-2 font-bold text-lg">Attendees</h2>
              <div v-if="attendees.length" class="my-2">
                <div class="flex flex-row">
                  <div v-for="(attendee, attendeeIndex) in attendees" :key="attendeeIndex">
                    <div class="rounded-md mx-2 px-3 py-1 text-white text-center text-base" :class="'bg-' + attendeesColors[attendee]">
                      <span class="">{{ attendee }}</span>
                    </div>
                  </div>
                </div>   
              </div>
              <div v-else><span>None.</span></div>
            </div>
            <div>
              <h2 class="my-2 font-bold text-lg">Summary Items</h2>
              <div v-if="orderedEntries.length" class="flex flex-col my-2 mr-16 child2 context">
                <div v-for="(entry, entryIndex) in orderedEntries" :key="entryIndex" class="ml-2">
                  <div v-if="entry.type == 'delimiter'" class="mb-2 flex justify-start" :class="{'border border-blue-800 rounded-md p-1': orderedEntries[entryIndex].outline}">
                    <div class="mr-2 flex flex-row space-x-2 items-center" v-if="!orderedEntries[entryIndex].editing && orderedEntries[entryIndex].text != ''">
                      <input type="checkbox" class="focus:ring-white" checked :ref="'check-' + entryIndex">
                      <svg class="inline cursor-pointer mb-1 w-5 transform hover:scale-110" @click="editHighlight(entryIndex)" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="028---Coloured-Pencil" fill="rgb(0,0,0)" fill-rule="nonzero"><path id="Shape" d="m37.381 3.062c1.2207502-.58548714 2.6762453-.35630038 3.658.576.9390562.98619475 1.1703464 2.45036916.581 3.678l-31.42 31.419c-.32511253-2.1939403-2.04185317-3.9200067-4.234-4.257z"/><path id="Shape" d="m47.3 12.94-31.441 31.436c-.3320279-2.1870828-2.0488389-3.9034885-4.236-4.235l31.437-31.436c1.2155936-.6078953 2.6837538-.37013899 3.6453629.59033615.9616092.96047515 1.2010977 2.42835375.5946371 3.64466385z"/><path id="Shape" d="m1.171 55.985c-.32329334.055683-.65333752-.0507433-.88320188-.2847979-.22986437-.2340546-.33031168-.5659673-.26879812-.8882021l.681-4.433c1.18520301.3028582 2.2657494.9222885 3.126 1.792.87107224.8608776 1.49155769 1.9424926 1.795 3.129z"/><path id="Shape" d="m17.233 53.5-9.624 1.49c-.37308438-1.6061263-1.19340297-3.0737546-2.366-4.233-1.15921198-1.1726409-2.62685381-1.9929671-4.233-2.366l1.49-9.624c.15163785-.7975088.58019655-1.5157873 1.21-2.028 1.2198302-.5849799 2.67419993-.3557824 3.655.576.95428456 1.0206965 1.16809197 2.5293375.535 3.775-.20594307.3870332-.13577323.8630791.17308318 1.1742301.30885641.3111511.78436986.3848426 1.17291682.1817699 1.2462801-.6355962 2.7570717-.4233659 3.78.531.9537783 1.0206046 1.1671864 2.5288487.534 3.774-.2061784.3874047-.1356804.8639667.1738309 1.1750852.3095112.3111185.7857017.3840839 1.1741691.1799148 1.2456658-.6352592 2.7557086-.4230218 3.778.531.9341031.9830018 1.1626345 2.441382.574 3.663-.5135628.6258809-1.2312601 1.0507633-2.027 1.2z"/><path id="Shape" d="m20.1 47.222c-.7608792-.7733981-1.7555878-1.2742673-2.83-1.425l31.414-31.417c1.2171322-.6251157 2.698435-.3947368 3.6682285.5704994.9697936.9652362 1.2071472 2.4454374.5877715 3.6655006l-31.419 31.418c-.1506789-1.0683668-.6502557-2.0569734-1.421-2.812z"/><path id="Shape" d="m55.194 16.346c-.1537051-1.0639379-.6530187-2.0478072-1.421-2.8-1.1014064-1.1115871-2.6580246-1.6462355-4.21-1.446.1921248-1.5521143-.3421076-3.10611899-1.4479943-4.21200568-1.1058867-1.10588668-2.6598914-1.6401191-4.2120057-1.44799432.1997386-1.55289907-.3356228-3.11017969-1.448-4.212-.751672-.76834259-1.7359046-1.26713761-2.8-1.419 1.1799454-1.09380356 3.012669-1.06203753 4.154.072l11.312 11.311c1.1430927 1.1373382 1.1754253 2.9772003.073 4.154z"/></g></g></svg>
                      <svg class="inline cursor-pointer mb-1 w-5 transform hover:scale-110" @click="deleteDelimiter(entryIndex)" viewBox="-57 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m156.371094 30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875 0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"/><path d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031 6.78125-13.566406 14.707031l24.253906 299.90625c1.351563 16.742188 15.316407 29.636719 32.09375 29.636719h204.542969c16.777344 0 30.742188-12.894531 32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282 312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562 0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531 5.957031-15.851562 14.472656-16.375 8.488281-.515625 15.851562 5.949219 16.375 14.472657l15.195312 246.207031c.527344 8.519531-5.953125 15.847656-14.46875 16.375zm90.433594-15.421875c0 8.53125-6.917969 15.449218-15.453125 15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156 6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125 6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718 246.207032c-.480469 8.210937-7.292969 14.542968-15.410156 14.542968-.304688 0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531 7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531 7.816406 14.519531 16.335937zm0 0"/><path d="m397.648438 120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125 0-15.964844 5.410156-18.636719 13.429687l-10.148438 30.421875c-1.957031 5.867188.589844 11.851562 5.34375 14.835938 1.9375 1.214843 4.230469 1.945312 6.75 1.945312h372.796876c2.519531 0 4.816406-.730469 6.75-1.949219 4.753906-2.984375 7.300781-8.96875 5.34375-14.832031zm0 0"/></svg>
                    </div>
                    <a v-if="!orderedEntries[entryIndex].editing" class="cursor-pointer" v-scroll-to="{
                      el: '#highlight-' + entryIndex,
                      container: '#transcript',
                      duration: 500,
                      offset: -300,
                    }">
                      <span>{{entry.text}}</span>
                    </a>
                    <textarea v-else rows="3" cols="30" class="w-full my-2" v-model="orderedEntries[entryIndex].text" @blur='resetEditHighlight(entryIndex)' v-on:keyup.enter="resetEditHighlight(entryIndex)" ref="editHighlight"></textarea>
                  </div>
                </div>
              </div>
              <div v-else>
                <span>None.</span>
              </div>
            </div>
            <div>
              <h2 class="my-2 font-bold text-lg">Keywords</h2>
              <div v-if="meeting.keywords.length && orderedEntries.length" class="flex flex-row flex-wrap my-2 mr-16 child2">
                <div v-for="(keyword, index) in meeting.keywords" :key="index" class="ml-2">
                  <div class="border border-blue-700 text-blue-700 px-3 py-1 rounded-md border-1 cursor-pointer my-1" @mouseover="markKeyword(keyword)">
                    {{ keyword }}
                  </div>
                </div>
              </div>
              <div v-else>
                <span>None.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ATTENDEES/HIGHLIGHTS/KEYWORDS END -->

      <!-- TRANSCRIPT -->
      <div class="md:w-2/5 p-4 border-t border-gray-200 border-transparent rounded-tr shadow-xl pt-8" ref="transcript">
        <div class="flex items-center justify-between pb-2 ">
          <div class="flex flex-row items-center space-x-2">
            <h2 class="my-2 font-bold text-lg">Transcript</h2>
            <svg v-if="entries.length" class="h-6 w-6 cursor-pointer transform hover:rotate-12" @click="saveJsonToDisk" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 13.679 13.679" style="enable-background:new 0 0 13.679 13.679;" xml:space="preserve"><g><g><path style="fill:#030104;" d="M13.383,1.361l-0.975-1.229c-0.127-0.158-0.318-0.13-0.318-0.13H0.439    c-0.242,0-0.438,0.195-0.438,0.437v12.802c0,0.241,0.196,0.438,0.438,0.438H13.24c0.242,0,0.438-0.196,0.438-0.438V12.72v-0.084    V2.07C13.678,2.032,13.68,1.768,13.383,1.361z M2.298,0.895h8.79v5.704h-8.79C2.298,6.599,2.298,0.895,2.298,0.895z M7.181,11.805    c-1.17,0-2.12-0.949-2.12-2.119s0.949-2.119,2.12-2.119c1.17,0,2.118,0.949,2.118,2.119S8.351,11.805,7.181,11.805z"/><path style="fill:#030104;" d="M9.866,5.707h-2.25V1.951h2.25V5.707z"/><path style="fill:#030104;" d="M7.195,8.681c-0.555,0-1.003,0.449-1.003,1.003c0,0.555,0.449,1.003,1.003,1.003    c0.553,0,1.002-0.448,1.002-1.003C8.197,9.13,7.748,8.681,7.195,8.681z"/></g></g></svg>
          </div>
        </div>
        <span v-if="granularity != null" class="text-black text-opacity-50">Granularity set to {{granularity}}.</span>
        <div v-if="!sections.length">Please load meeting file.</div> 
        <div v-if="createSections" class="inline-block mr-2">
          <input type="number" placeholder="Granularity" ref="granularity" min="1" class="ml-2 p-2 font-bold focus:ring-blue-600 focus:border-blue-600 border-blue-600 rounded-md">
          <button type="button" @click="setGranularity" class="transition duration-500 ease-in-out p-2 border border-transparent text-base text-white font-bold hover:text-blue-600 font-medium rounded-md bg-blue-600 hover:bg-white hover:border-blue-600 focus:outline-none">
            Submit
          </button>
        </div>
        <button v-if="sections.length"
          @click="toggleCreateSections"
          class="transition duration-500 ease-in-out font-bold p-2 ml-2 rounded-md border focus:outline-none" 
          :class="!createSections ? ['hover:text-blue-600', 'hover:bg-white', 'border-blue-700', 'bg-blue-600', 'text-white', 'focus:ring-blue-800'] : ['bg-red-700', 'text-white', 'hover:text-red-700', 'hover:border-red-700', 'hover:bg-white', 'focus:ring-red-700', 'border-red-700']"
        >
          <span v-if="!createSections">Create sections</span>
          <span v-else>Back to default</span>
        </button>      
        <div class="flex flex-col my-2 pl-2 parent context">
          <draggable
            class="child" 
            draggable=".draggable-entry" 
            v-model="orderedEntries"
            :move="onMoveCallback"
            @change="clearDelimiterHighlights($event)"
            id="transcript"
          >
            <template v-for="(entry, entryIndex) in orderedEntries" class="">
              <div v-if="entry.type != 'delimiter'" class="my-4 draggable-entry group"  :key="entryIndex" data-type="entry">
                <div class="flex flex-row items-center justify-start space-x-2">
                  <div v-if="entry.speaker" class="border-2 border-transparent rounded-full h-8 w-8 flex items-center justify-center text-white" :class="'bg-' + attendeesColors[entry.speaker]">
                    {{entry.speaker.charAt(0)}}
                  </div>
                  <span class="text-black text-opacity-50 text-sm">
                    {{entry.speaker}} - {{entry.time}}
                  </span>
                </div>
                <p v-if="!orderedEntries[entryIndex].hasOwnProperty('editing')" class="mt-1 ml-10 text-sm">
                  <span>{{entry.text}}</span>
                  <svg class="inline cursor-pointer mb-1 w-4 transform hover:scale-110" @click="editEntry(entryIndex)" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" fill="none" fill-rule="evenodd"><g id="028---Coloured-Pencil" fill="rgb(0,0,0)" fill-rule="nonzero"><path id="Shape" d="m37.381 3.062c1.2207502-.58548714 2.6762453-.35630038 3.658.576.9390562.98619475 1.1703464 2.45036916.581 3.678l-31.42 31.419c-.32511253-2.1939403-2.04185317-3.9200067-4.234-4.257z"/><path id="Shape" d="m47.3 12.94-31.441 31.436c-.3320279-2.1870828-2.0488389-3.9034885-4.236-4.235l31.437-31.436c1.2155936-.6078953 2.6837538-.37013899 3.6453629.59033615.9616092.96047515 1.2010977 2.42835375.5946371 3.64466385z"/><path id="Shape" d="m1.171 55.985c-.32329334.055683-.65333752-.0507433-.88320188-.2847979-.22986437-.2340546-.33031168-.5659673-.26879812-.8882021l.681-4.433c1.18520301.3028582 2.2657494.9222885 3.126 1.792.87107224.8608776 1.49155769 1.9424926 1.795 3.129z"/><path id="Shape" d="m17.233 53.5-9.624 1.49c-.37308438-1.6061263-1.19340297-3.0737546-2.366-4.233-1.15921198-1.1726409-2.62685381-1.9929671-4.233-2.366l1.49-9.624c.15163785-.7975088.58019655-1.5157873 1.21-2.028 1.2198302-.5849799 2.67419993-.3557824 3.655.576.95428456 1.0206965 1.16809197 2.5293375.535 3.775-.20594307.3870332-.13577323.8630791.17308318 1.1742301.30885641.3111511.78436986.3848426 1.17291682.1817699 1.2462801-.6355962 2.7570717-.4233659 3.78.531.9537783 1.0206046 1.1671864 2.5288487.534 3.774-.2061784.3874047-.1356804.8639667.1738309 1.1750852.3095112.3111185.7857017.3840839 1.1741691.1799148 1.2456658-.6352592 2.7557086-.4230218 3.778.531.9341031.9830018 1.1626345 2.441382.574 3.663-.5135628.6258809-1.2312601 1.0507633-2.027 1.2z"/><path id="Shape" d="m20.1 47.222c-.7608792-.7733981-1.7555878-1.2742673-2.83-1.425l31.414-31.417c1.2171322-.6251157 2.698435-.3947368 3.6682285.5704994.9697936.9652362 1.2071472 2.4454374.5877715 3.6655006l-31.419 31.418c-.1506789-1.0683668-.6502557-2.0569734-1.421-2.812z"/><path id="Shape" d="m55.194 16.346c-.1537051-1.0639379-.6530187-2.0478072-1.421-2.8-1.1014064-1.1115871-2.6580246-1.6462355-4.21-1.446.1921248-1.5521143-.3421076-3.10611899-1.4479943-4.21200568-1.1058867-1.10588668-2.6598914-1.6401191-4.2120057-1.44799432.1997386-1.55289907-.3356228-3.11017969-1.448-4.212-.751672-.76834259-1.7359046-1.26713761-2.8-1.419 1.1799454-1.09380356 3.012669-1.06203753 4.154.072l11.312 11.311c1.1430927 1.1373382 1.1754253 2.9772003.073 4.154z"/></g></g></svg>
                </p>
                <textarea v-else rows="3" cols="30" class="w-full my-2" v-model="orderedEntries[entryIndex].text" @blur='resetEditEntry(entryIndex)' v-on:keyup.enter="resetEditEntry(entryIndex)" ref="editEntry"></textarea>
                <span v-if="(entryIndex + 1) != orderedEntries.length && !orderedEntries[entryIndex + 1].hasOwnProperty('type')" class="invisible group-hover:visible text-black text-opacity-50 cursor-pointer" @click="addDelimiter(entryIndex)">Add delimiter</span>
              </div>
              <div v-else :id="'highlight-'+ entryIndex" :ref="'highlight-' + entryIndex" :key="entryIndex" class="pt-2 pb-4 mx-5 cursor-pointer draggable-entry group" data-type="delimiter">
                <div class="flex flex-row justify-between">
                  <span v-if="!entry.text" class="invisible group-hover:visible text-black text-opacity-50 cursor-pointer" @click="editHighlight(entryIndex)">Add text</span>
                  <span class="invisible group-hover:visible text-black text-opacity-50 cursor-pointer" @click="deleteDelimiter(entryIndex)">Delete delimiter</span>
                </div>
                <div class="h-1 bg-black rounded-full w-full flex flex-row justify-center items-center">
                  <div v-if="!entry.text">
                    <div class="flex-row justify-center">
                      <div class="rounded-full border border-black transform hover:scale-110">
                        <svg v-if="!entry.loading" @click="sectionsToApi(entryIndex)" class="h-6 w-6 rounded-full p-1 bg-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                        <svg v-if="entry.loading" class="h-6 w-6 rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="black" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/></circle></svg>
                      </div>
                    </div>
                  </div>
                  <div v-else class="rounded-full border border-black transform hover:scale-110">
                    <svg v-if="!entry.loading" class="h-6 w-6 rounded-full p-1 bg-white" @click="sectionsToApi(entryIndex)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.645 489.645" style="enable-background:new 0 0 489.645 489.645;" xml:space="preserve"><g><path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3   c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5   c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8   c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2   C414.856,432.511,548.256,314.811,460.656,132.911z"/></g></svg>
                    <svg v-if="entry.loading" class="h-6 w-6 rounded-full bg-white" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block; shape-rendering: auto;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="black" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"/></circle></svg>
                  </div>
                </div>

                <p @click="outlineHighlight(entryIndex)" v-if="entry.text" class="text-sm font-bold mt-2">
                  <span>{{entry.text}}</span>
                </p>
              </div>
              
            </template>
          </draggable>
        </div>
      </div>
      <!-- TRANSCRIPT END -->
    <!-- main container END -->
    </div>
  </div>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>

<script>
import draggable from 'vuedraggable'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    draggable,
    VueSlider,
  },
  head() {
    return {
      title: this.title,
    }
  },
  data() {
    return {
      title: "ActionPoint - Meetings",
      file: {},
      sections: [],
      entries: [],
      highlights: [],
      attendees: [],
      createSections: false,
      totalEntries: null,
      granularity: null,
      temperature: 0.5,
      colors: ["red-600", "blue-600", "green-600", "yellow-600", "pink-600", "indigo-600", "purple-600"],
      attendeesColors: {},
      orderedEntries: [],
      orderedEntriesDefault: [],
      displayMeetings: true,
      oldEntry: "",
    }
  },
  created() {
    this.parseMeeting(this.meeting)
  },
  updated() {
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
      alert("Error occured: " + errorMsg);//or any message
      return false;
    }
    window.addEventListener("error", function (e) {
      alert("Error occurred: " + e.error.message);
      return false;
    })
    window.addEventListener('unhandledrejection', function (e) {
      alert("Error occurred: " + e.reason.message);
    })
  },
  computed: {
    ...mapGetters({
      project: 'menu/getProject',
      meeting: 'menu/getMeeting'
    }),
  },
  methods: {
    ...mapActions({
      setMeeting: 'menu/setMeeting'
    }),
    changeMeeting(meeting) {
      this.setMeeting(meeting)
      this.parseMeeting(meeting)
    },
    parseMeeting(meeting) {
      this.sections = meeting.sections
      this.highlights = []
      this.orderedEntries = []

      this.sections.forEach(section => {
        this.totalEntries += section.entries.length
        this.entries = this.entries.concat(section.entries)

        this.orderedEntries = this.orderedEntries.concat(section.entries)
        this.orderedEntries = this.orderedEntries.concat({ type: 'delimiter', text: section.highlight, editing: false, loading: false})

        this.highlights = this.highlights.concat(section.highlight)
      })

      let speakerIndex = 0
      this.entries.forEach(entry => {
        if(!this.attendees.includes(entry.speaker)) {
          this.attendees = this.attendees.concat(entry.speaker)
          this.attendeesColors[entry.speaker] = this.colors[speakerIndex]
          speakerIndex += 1
        }
      })
    },
    saveJsonToDisk() {
      if(!this.orderedEntries.length) {
        alert('Error! No transcript to save')
        return
      }

      let transcript = new Object()
      transcript.sections = []
      transcript.sections.push(new Object())
    
      let sectionsCounter = 0

      this.orderedEntries.forEach((entry, index) => {
        if(!(transcript.sections[sectionsCounter]).hasOwnProperty('entries')) {
          transcript.sections[sectionsCounter].entries = []
        }
        if((this.orderedEntries[index]).hasOwnProperty('speaker')) {
          transcript.sections[sectionsCounter].entries = transcript.sections[sectionsCounter].entries.concat(this.orderedEntries[index])
        }
        else {
          transcript.sections[sectionsCounter].highlight = this.orderedEntries[index].text
          if(index != this.orderedEntries.length - 1) {
            transcript.sections.push(new Object())
          }
          sectionsCounter++
        }
      })

      transcript = JSON.stringify(transcript)

      const blob = new Blob([transcript], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
      a.download = "transcript.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);     
    },
    editEntry(index){
      this.oldEntry = this.orderedEntries[index].text
      this.orderedEntries[index].editing = true
      this.$forceUpdate()
      setTimeout(() => {
        this.$refs.editEntry[0].focus()
      },100)
    },
    resetEditEntry(index){
      delete this.orderedEntries[index].editing
      if(this.oldEntry != this.orderedEntries[index].text){
        while(this.orderedEntries[index].type != 'delimiter') {
          ++index
        }
        this.orderedEntries[index].text = ''
      }
      this.oldEntry = ""
      this.$forceUpdate()
    },
    editHighlight(index) {
      this.orderedEntries[index].editing = true
      setTimeout(() => {
        this.$refs.editHighlight[0].focus()
      },100)
    },
    resetEditHighlight(index) {
      this.orderedEntries[index].editing = false
    },
    outlineHighlight(index) {
      this.orderedEntries[index].outline = true
      this.$forceUpdate()
      setTimeout(() => {
        delete this.orderedEntries[index].outline
        this.$forceUpdate()
      }, 1000)
    },
    highlightKeyword(word) {   
      if(!this.$refs[word]) {
        alert("Keyword error")
        return
      }
       
      for(let i = 0; i < this.$refs[word].length; ++i) { 
        this.$refs[word][i].classList.toggle('text-red-600')
        this.$refs[word][i].classList.toggle('text-blue-700')
        this.$refs[word][i].classList.toggle('bg-yellow-300')
      }
    },
    async sectionsToApi(entryIndex) {
      
      let apiPayload = new Object()

      apiPayload.shots = parseInt(this.$refs.shots.value)
      apiPayload.temperature = this.temperature
      apiPayload.sections = []
      apiPayload.selectedHighlights = []
      apiPayload.sections.push(new Object())

    
      let sectionsCounter = 0

      for(let i = 0; i <= entryIndex; ++i) {
        if(!(apiPayload.sections[sectionsCounter]).hasOwnProperty('entries')) {
          apiPayload.sections[sectionsCounter].entries = []
        }
        if((this.orderedEntries[i]).hasOwnProperty('speaker')) {
          apiPayload.sections[sectionsCounter].entries = apiPayload.sections[sectionsCounter].entries.concat(this.orderedEntries[i])
        }
        else {
          apiPayload.sections[sectionsCounter].highlight = this.orderedEntries[i].text
          if(i != entryIndex) {
            apiPayload.sections.push(new Object())
          }
          sectionsCounter++
        }
      }

      this.orderedEntries.forEach((entry, index) => {
        if(!this.$refs['check-' + index] || entry.type != 'delimiter') {
          return
        }

        if(this.$refs['check-' + index][0] && this.$refs['check-' + index][0].checked) {
          apiPayload.selectedHighlights.push(entry.text)
        }
      })
      
      apiPayload = JSON.stringify(apiPayload)
      let computedHighlight = null
     
      this.orderedEntries[entryIndex].loading = true
      computedHighlight = await fetch("http://actionpoint.vps.webdock.cloud:5000/api/highlight", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + JSON.parse(this.getCookie("authentication-cookie")).auth.access_token
        },
        body: apiPayload
      })
      .then((res) => {
        this.orderedEntries[entryIndex].loading = false
        return res.json()
      })
      .catch(() => {
        this.orderedEntries[entryIndex].loading = false
        alert('API cannot be accessed')
        return
      })
      
      if(computedHighlight) {
        this.orderedEntries[entryIndex].text = computedHighlight
      }
    },
    onMoveCallback(evt, originalEvent){
      switch(evt.dragged.dataset.type) {
        case 'entry':
          return false
      }
    },
    clearDelimiterHighlights(event) {
      let changeIndex = event.moved.newIndex
      let nextHighlightReset = false

      this.orderedEntries[changeIndex].text = ''
      changeIndex++

      while(!nextHighlightReset && changeIndex < this.orderedEntries.length) {
        if(this.orderedEntries[changeIndex].type == 'delimiter') {
          this.orderedEntries[changeIndex].text = ''
          nextHighlightReset = true
        }
        ++changeIndex
      }
      this.orderedEntriesDefault = []
    },
    deleteDelimiter(index) {
      let delimiterEntries = []
      let indexClone = index - 1

      if (index != this.orderedEntries.length) {
        for(indexClone; indexClone >= 0; indexClone--){
          if(this.orderedEntries[indexClone].type == 'delimiter') {
            break
          }
          else {
            delimiterEntries = delimiterEntries.concat(this.orderedEntries[indexClone])
          }
        }

        for(let nextHighlightIndex = index + 1; nextHighlightIndex < this.orderedEntries.length; nextHighlightIndex++) {
          if(this.orderedEntries[nextHighlightIndex].type == 'delimiter') {
            this.orderedEntries[nextHighlightIndex].text = ''
            break
          }
        }
      }

      delimiterEntries.reverse()
      this.orderedEntries.splice(indexClone + 1, index - indexClone, ...delimiterEntries)
      this.$forceUpdate()
    },
    addDelimiter(index) {
      this.orderedEntries.splice(index + 1, 0, { type: 'delimiter', text: '', editing: false, loading: false })

      for(let i = index + 2; i < this.orderedEntries.length; i++) {
        if(this.orderedEntries[i].hasOwnProperty('type')) {
          this.orderedEntries[i].text = ''
          break
        }
      }
    },
    loadJsonFile(event) {
      this.file = event.target.files[0]
      if(!this.file) {
        return
      }
      
      this.readJsonFile()
    },
    readJsonFile() {
      let reader = new FileReader();
      reader.onload = this.handleFileLoad
      reader.readAsText(this.file);
    },
    handleFileLoad(event) {
      let data = JSON.parse(event.target.result)
      this.sections = data.sections
      this.highlights = []
      this.orderedEntries = []

      this.sections.forEach(section => {
        this.totalEntries += section.entries.length
        this.entries = this.entries.concat(section.entries)

        this.orderedEntries = this.orderedEntries.concat(section.entries)
        this.orderedEntries = this.orderedEntries.concat({ type: 'delimiter', text: section.highlight, editing: false, loading: false})

        this.highlights = this.highlights.concat(section.highlight)
      })

      let speakerIndex = 0
      this.entries.forEach(entry => {
        if(!this.attendees.includes(entry.speaker)) {
          this.attendees = this.attendees.concat(entry.speaker)
          this.attendeesColors[entry.speaker] = this.colors[speakerIndex]
          speakerIndex += 1
        }
      })
    },
    setGranularity() {
      this.granularity = this.$refs.granularity.value
      if(!this.orderedEntriesDefault.length) this.orderedEntriesDefault = this.orderedEntries
      this.orderedEntries = []

      this.entries.forEach((entry, index) => {
        this.orderedEntries.push(entry)
        if(index != 0 && (index + 1) % this.granularity == 0) {
          this.orderedEntries.push({type: 'delimiter', text: '', editing: false, loading: false})
        }
      })
    },
    toggleCreateSections() {
      this.createSections = !this.createSections
      this.granularity = null
      if(this.orderedEntriesDefault.length) this.orderedEntries = this.orderedEntriesDefault
    },
    markKeyword(keyword) {
      let markInstance = new Mark(document.querySelector(".context"));
      
      let options = {
        "accuracy": "exactly",
        "diacritics": false,
        "caseSensitive": true
      };
       
      markInstance.unmark({
        done: function(){
          markInstance.mark(keyword, options);
        }
      });
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
.mark{
    background: orange;
    color: turquoise;
}
.parent {
  width: 100%;
  height: 90%;
  /* border: 1px solid #AAA; */
  /* overflow: hidden; */
}

.parent2 {
  width: 100%;
  height: 100%;
  /* border: 1px solid #AAA; */
  overflow: hidden;
}

.child {
  height: 100%;
  /* margin-right: -50px; Maximum width of scrollbar */
  /* padding-right: 50px; Maximum width of scrollbar */
  padding-right: 10px;
  overflow-y: scroll;
}

.child2 {
  height: 100%;
  overflow-y: scroll;
  margin-right: -50px;
  padding-right: 50px;
}

</style>