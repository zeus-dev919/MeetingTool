<template>
  <div>
    <div class='container px-32 pt-10 '>
      <div class='grid grid-cols-12 gap-8'>
        <div class='xl:col-span-7 md:col-span-12'>
          <div class='w-full h-auto mb-8'>
            <div class='py-4 pl-6 text-2xl font-extrabold'>About</div>
            <div class='grid w-full h-auto grid-rows-3 gap-4 px-6 py-8 border-2 border-gray-200 rounded-2xl'>
              <div class='h-auto'>
                <div class='inline mr-2 font-bold '>Topics:</div>
                <div class='inline-block px-6 py-2 mx-2 text-gray-400 border-2 border-gray-200 rounded-2xl bg-slate-100'>productivity</div>
                <div class='inline-block px-6 py-2 mx-2 text-gray-400 border-2 border-gray-200 rounded-2xl bg-slate-100'>new tools</div>
                <div class='inline-block px-4 py-2 mx-2 text-gray-400 border-2 border-gray-200 rounded-full bg-slate-100 hover:cursor-pointer' >+</div>
              </div>
              <div>
                <div class='inline mr-2 font-bold '>Attendees:</div>
                <img class="inline-block mx-2 rounded-full h-9 w-9 ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <img class="inline-block mx-2 rounded-full h-9 w-9 ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <img class="inline-block mx-2 rounded-full h-9 w-9 ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                <div class='inline-block px-4 py-2 mx-2 text-gray-400 border-2 border-gray-200 rounded-full bg-slate-100 hover:cursor-pointer'>+</div>
              </div>
              <div>
                <div class='inline mr-2 font-bold '>Notes:</div>
                <div class='inline-block px-4 py-2 mx-2 text-gray-400 border-2 border-gray-200 rounded-full bg-slate-100 hover:cursor-pointer'>+</div>
              </div>
            </div>
          </div>
          <div class='w-full h-auto'>
            <div class='flex justify-between pl-6 mb-2'>
              <div class='py-3 text-2xl font-extrabold'>Summary</div>
              <button class='px-10 font-bold text-white bg-yellow-600 rounded-full'>Edit</button>
            </div>
            <div class='flex flex-col h-screen space-y-1 overflow-y-auto border-2 border-gray-200 rounded-2xl'>
              <div v-for="(items , idx) in data.transcript" :key="idx">
                <div class='grid grid-cols-12 gap-4 py-4 pl-6 pr-2 mr-2 border-2 rounded-2xl ' :class="(items.speaker == user)? [' border-yellow-500 bg-red-50']:['border-purple-500 bg-purple-50 ']">
                  <div class='flex items-center justify-center w-10 h-10 border-2 rounded-full lg:col-span-1 md:col-span-2 text-md' :class="(items.speaker == user)? ['  border-yellow-500 text-yellow-500']:['border-purple-500 text-purple-500']">{{(items.speaker == user)? 1: 2}}</div>
                  <div class='inline-block lg:col-span-11 md:col-span-10 '> img elements must have an alt prop, either with meaningful text, or an empty string for decorative images</div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class='h-auto xl:col-span-5 md:col-span-12'>
          <div class='flex justify-between pl-6 mb-2'>
            <div class='py-3 text-2xl font-extrabold'>Transcript</div>
          </div>
          <div class='flex flex-col space-y-1 h-[1080px] border-2 border-gray-200 rounded-2xl overflow-y-auto' >

            <div v-for="(items , idx) in data.transcript" :key="idx">
                <div class="py-4 pl-6 pr-2 mr-2 border-2 cursor-pointer rounded-2xl hover:animate-pulse" id="idx"  @click="click(idx)" :class="(items.speaker == user)? ['border-yellow-500 bg-red-50'] : ['border-purple-500 bg-purple-50']" >
                    <div class='grid grid-cols-12 gap-4'>
                        <img class="inline-block col-span-2 mx-2 rounded-full h-9 w-9 ring-2 ring-white" :src="(items.speaker == user)? ['https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'] : ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80']"  />
                        <div class='inline-block col-span-10 '>
                            <div class='block pb-6 font-bold'>{{items.speaker}} | {{parseTime(items.end_time)}}</div>
                            <span class='inline-block text-gray-500 ' v-for="(item , index) in items.words" :key="index" :ref="`${idx}words${index}`"><pre>{{item.word}} </pre></span>
                        </div>
                    </div>
                </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
    <div>
      <audio controls hidden ref="player" :src="musicSrc" />
    </div>

  </div>
</template>

<script>

export default {
  name: "app",
  layout: 'user',
  mounted() {
      
  },

  data() {
    return {
      data: {
        transcript: [
          {
            end_time: 0.5,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 0.2,
            transcript: "Yeah.",
            words: [
              {
                end_time: 0.5,
                start_time: 0.2,
                word: "Yeah.",
              },
            ],
          },
          {
            end_time: 2.4,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 1.4,
            transcript: "Okay. Hello Richard?",
            words: [
              {
                end_time: 1.7,
                start_time: 1.4,
                word: "Okay.",
              },
              {
                end_time: 2,
                start_time: 1.7,
                word: "Hello",
              },
              {
                end_time: 2.4,
                start_time: 2,
                word: "Richard?",
              },
            ],
          },
          {
            end_time: 5.8,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 3.1,
            transcript: "I Darian. How are you? Hello. Hello well.",
            words: [
              {
                end_time: 3.5,
                start_time: 3.1,
                word: "I",
              },
              {
                end_time: 3.8,
                start_time: 3.5,
                word: "Darian.",
              },
              {
                end_time: 3.9,
                start_time: 3.8,
                word: "How",
              },
              {
                end_time: 4.1,
                start_time: 3.9,
                word: "are",
              },
              {
                end_time: 4.4,
                start_time: 4.1,
                word: "you?",
              },
              {
                end_time: 4.7,
                start_time: 4.5,
                word: "Hello.",
              },
              {
                end_time: 5.2,
                start_time: 4.7,
                word: "Hello",
              },
              {
                end_time: 5.8,
                start_time: 5.6,
                word: "well.",
              },
            ],
          },
          {
            end_time: 6.3,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 5.8,
            transcript: "Thank you.",
            words: [
              {
                end_time: 6.1,
                start_time: 5.8,
                word: "Thank",
              },
              {
                end_time: 6.3,
                start_time: 6.1,
                word: "you.",
              },
            ],
          },
          {
            end_time: 9.5,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 6.7,
            transcript: "Good. You good you good to me any me.",
            words: [
              {
                end_time: 7.3,
                start_time: 6.7,
                word: "Good.",
              },
              {
                end_time: 7.6,
                start_time: 7.4,
                word: "You",
              },
              {
                end_time: 7.7,
                start_time: 7.6,
                word: "good",
              },
              {
                end_time: 8,
                start_time: 7.7,
                word: "you",
              },
              {
                end_time: 8.4,
                start_time: 8.2,
                word: "good",
              },
              {
                end_time: 8.5,
                start_time: 8.4,
                word: "to",
              },
              {
                end_time: 8.8,
                start_time: 8.5,
                word: "me",
              },
              {
                end_time: 9.1,
                start_time: 8.8,
                word: "any",
              },
              {
                end_time: 9.5,
                start_time: 9.1,
                word: "me.",
              },
            ],
          },
          {
            end_time: 11.9,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 9.7,
            transcript: "See me to think that's the phrase I think.",
            words: [
              {
                end_time: 10,
                start_time: 9.7,
                word: "See",
              },
              {
                end_time: 10.2,
                start_time: 10,
                word: "me",
              },
              {
                end_time: 10.3,
                start_time: 10.2,
                word: "to",
              },
              {
                end_time: 10.5,
                start_time: 10.3,
                word: "think",
              },
              {
                end_time: 10.7,
                start_time: 10.5,
                word: "that's",
              },
              {
                end_time: 10.8,
                start_time: 10.7,
                word: "the",
              },
              {
                end_time: 11.1,
                start_time: 10.8,
                word: "phrase",
              },
              {
                end_time: 11.5,
                start_time: 11.4,
                word: "I",
              },
              {
                end_time: 11.9,
                start_time: 11.5,
                word: "think.",
              },
            ],
          },
          {
            end_time: 22,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 11.9,
            transcript:
              "So yes it's not very neat. People on screens over the last 18 months and years like the new meat.",
            words: [
              {
                end_time: 12,
                start_time: 11.9,
                word: "So",
              },
              {
                end_time: 13.7,
                start_time: 13.2,
                word: "yes",
              },
              {
                end_time: 14.4,
                start_time: 14.3,
                word: "it's",
              },
              {
                end_time: 14.6,
                start_time: 14.4,
                word: "not",
              },
              {
                end_time: 14.9,
                start_time: 14.6,
                word: "very",
              },
              {
                end_time: 15.1,
                start_time: 14.9,
                word: "neat.",
              },
              {
                end_time: 17.3,
                start_time: 17,
                word: "People",
              },
              {
                end_time: 17.4,
                start_time: 17.3,
                word: "on",
              },
              {
                end_time: 18.1,
                start_time: 17.4,
                word: "screens",
              },
              {
                end_time: 18.3,
                start_time: 18.1,
                word: "over",
              },
              {
                end_time: 18.3,
                start_time: 18.3,
                word: "the",
              },
              {
                end_time: 18.6,
                start_time: 18.3,
                word: "last",
              },
              {
                end_time: 19,
                start_time: 18.6,
                word: "18",
              },
              {
                end_time: 19.5,
                start_time: 19,
                word: "months",
              },
              {
                end_time: 19.7,
                start_time: 19.5,
                word: "and",
              },
              {
                end_time: 20,
                start_time: 19.7,
                word: "years",
              },
              {
                end_time: 21.1,
                start_time: 20.9,
                word: "like",
              },
              {
                end_time: 21.2,
                start_time: 21.1,
                word: "the",
              },
              {
                end_time: 21.4,
                start_time: 21.2,
                word: "new",
              },
              {
                end_time: 22,
                start_time: 21.4,
                word: "meat.",
              },
            ],
          },
          {
            end_time: 26.3,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 22.6,
            transcript:
              "Yeah. I suppose. So I suppose it's as its as good as we've got at the moment, isn't it? Hello. Harry.",
            words: [
              {
                end_time: 22.9,
                start_time: 22.6,
                word: "Yeah.",
              },
              {
                end_time: 23,
                start_time: 22.9,
                word: "I",
              },
              {
                end_time: 23.2,
                start_time: 23,
                word: "suppose.",
              },
              {
                end_time: 23.4,
                start_time: 23.2,
                word: "So",
              },
              {
                end_time: 23.5,
                start_time: 23.4,
                word: "I",
              },
              {
                end_time: 23.8,
                start_time: 23.5,
                word: "suppose",
              },
              {
                end_time: 24,
                start_time: 23.8,
                word: "it's",
              },
              {
                end_time: 24.2,
                start_time: 24,
                word: "as",
              },
              {
                end_time: 24.4,
                start_time: 24.2,
                word: "its",
              },
              {
                end_time: 24.5,
                start_time: 24.4,
                word: "as",
              },
              {
                end_time: 24.6,
                start_time: 24.5,
                word: "good",
              },
              {
                end_time: 24.7,
                start_time: 24.6,
                word: "as",
              },
              {
                end_time: 24.8,
                start_time: 24.7,
                word: "we've",
              },
              {
                end_time: 25,
                start_time: 24.8,
                word: "got",
              },
              {
                end_time: 25.1,
                start_time: 25,
                word: "at",
              },
              {
                end_time: 25.2,
                start_time: 25.1,
                word: "the",
              },
              {
                end_time: 25.4,
                start_time: 25.2,
                word: "moment,",
              },
              {
                end_time: 25.6,
                start_time: 25.4,
                word: "isn't",
              },
              {
                end_time: 25.7,
                start_time: 25.6,
                word: "it?",
              },
              {
                end_time: 25.9,
                start_time: 25.7,
                word: "Hello.",
              },
              {
                end_time: 26.3,
                start_time: 25.9,
                word: "Harry.",
              },
            ],
          },
          {
            end_time: 28.7,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 26.4,
            transcript: "Hey, I Eric, how are you?",
            words: [
              {
                end_time: 26.8,
                start_time: 26.4,
                word: "Hey,",
              },
              {
                end_time: 27.9,
                start_time: 27.7,
                word: "I",
              },
              {
                end_time: 28.2,
                start_time: 27.9,
                word: "Eric,",
              },
              {
                end_time: 28.3,
                start_time: 28.2,
                word: "how",
              },
              {
                end_time: 28.4,
                start_time: 28.3,
                word: "are",
              },
              {
                end_time: 28.7,
                start_time: 28.4,
                word: "you?",
              },
            ],
          },
          {
            end_time: 33.7,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 29,
            transcript:
              "Yeah, I'm good. Are you? Yeah, a very high Thing by any even better.",
            words: [
              {
                end_time: 29.3,
                start_time: 29,
                word: "Yeah,",
              },
              {
                end_time: 29.4,
                start_time: 29.3,
                word: "I'm",
              },
              {
                end_time: 29.8,
                start_time: 29.4,
                word: "good.",
              },
              {
                end_time: 30,
                start_time: 30,
                word: "Are",
              },
              {
                end_time: 30.4,
                start_time: 30,
                word: "you?",
              },
              {
                end_time: 30.9,
                start_time: 30.7,
                word: "Yeah,",
              },
              {
                end_time: 30.9,
                start_time: 30.9,
                word: "a",
              },
              {
                end_time: 31.2,
                start_time: 30.9,
                word: "very",
              },
              {
                end_time: 31.5,
                start_time: 31.2,
                word: "high",
              },
              {
                end_time: 31.6,
                start_time: 31.5,
                word: "Thing",
              },
              {
                end_time: 31.8,
                start_time: 31.6,
                word: "by",
              },
              {
                end_time: 32.1,
                start_time: 31.8,
                word: "any",
              },
              {
                end_time: 33.4,
                start_time: 33.1,
                word: "even",
              },
              {
                end_time: 33.7,
                start_time: 33.4,
                word: "better.",
              },
            ],
          },
          {
            end_time: 35.4,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 33.7,
            transcript: "Now that it's definitely coming home.",
            words: [
              {
                end_time: 33.9,
                start_time: 33.7,
                word: "Now",
              },
              {
                end_time: 34.1,
                start_time: 33.9,
                word: "that",
              },
              {
                end_time: 34.2,
                start_time: 34.1,
                word: "it's",
              },
              {
                end_time: 34.6,
                start_time: 34.2,
                word: "definitely",
              },
              {
                end_time: 34.9,
                start_time: 34.6,
                word: "coming",
              },
              {
                end_time: 35.4,
                start_time: 34.9,
                word: "home.",
              },
            ],
          },
          {
            end_time: 41,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 38.4,
            transcript: "I'm driving you differently about that are exactly.",
            words: [
              {
                end_time: 38.6,
                start_time: 38.4,
                word: "I'm",
              },
              {
                end_time: 39.1,
                start_time: 38.6,
                word: "driving",
              },
              {
                end_time: 39.3,
                start_time: 39.2,
                word: "you",
              },
              {
                end_time: 40,
                start_time: 39.6,
                word: "differently",
              },
              {
                end_time: 40.2,
                start_time: 40,
                word: "about",
              },
              {
                end_time: 40.4,
                start_time: 40.2,
                word: "that",
              },
              {
                end_time: 40.5,
                start_time: 40.4,
                word: "are",
              },
              {
                end_time: 41,
                start_time: 40.5,
                word: "exactly.",
              },
            ],
          },
          {
            end_time: 44.5,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 43,
            transcript: "This is a terrible joke to make.",
            words: [
              {
                end_time: 43.2,
                start_time: 43,
                word: "This",
              },
              {
                end_time: 43.3,
                start_time: 43.2,
                word: "is",
              },
              {
                end_time: 43.4,
                start_time: 43.3,
                word: "a",
              },
              {
                end_time: 43.9,
                start_time: 43.4,
                word: "terrible",
              },
              {
                end_time: 44.2,
                start_time: 43.9,
                word: "joke",
              },
              {
                end_time: 44.3,
                start_time: 44.2,
                word: "to",
              },
              {
                end_time: 44.5,
                start_time: 44.3,
                word: "make.",
              },
            ],
          },
          {
            end_time: 61.9,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 55.1,
            transcript:
              "The only thing that annoys me is that I can already predict every single conversation. I'm going to have gone. The taxi for the next two years.",
            words: [
              {
                end_time: 55.2,
                start_time: 55.1,
                word: "The",
              },
              {
                end_time: 55.4,
                start_time: 55.2,
                word: "only",
              },
              {
                end_time: 55.6,
                start_time: 55.4,
                word: "thing",
              },
              {
                end_time: 55.8,
                start_time: 55.6,
                word: "that",
              },
              {
                end_time: 56.2,
                start_time: 55.8,
                word: "annoys",
              },
              {
                end_time: 56.4,
                start_time: 56.2,
                word: "me",
              },
              {
                end_time: 56.5,
                start_time: 56.4,
                word: "is",
              },
              {
                end_time: 56.7,
                start_time: 56.5,
                word: "that",
              },
              {
                end_time: 56.8,
                start_time: 56.7,
                word: "I",
              },
              {
                end_time: 57,
                start_time: 56.8,
                word: "can",
              },
              {
                end_time: 57.3,
                start_time: 57,
                word: "already",
              },
              {
                end_time: 58,
                start_time: 57.3,
                word: "predict",
              },
              {
                end_time: 58.2,
                start_time: 58,
                word: "every",
              },
              {
                end_time: 58.5,
                start_time: 58.2,
                word: "single",
              },
              {
                end_time: 59.1,
                start_time: 58.5,
                word: "conversation.",
              },
              {
                end_time: 59.2,
                start_time: 59.1,
                word: "I'm",
              },
              {
                end_time: 59.4,
                start_time: 59.2,
                word: "going",
              },
              {
                end_time: 59.5,
                start_time: 59.4,
                word: "to",
              },
              {
                end_time: 59.7,
                start_time: 59.5,
                word: "have",
              },
              {
                end_time: 59.8,
                start_time: 59.7,
                word: "gone.",
              },
              {
                end_time: 60.2,
                start_time: 60,
                word: "The",
              },
              {
                end_time: 60.7,
                start_time: 60.2,
                word: "taxi",
              },
              {
                end_time: 60.8,
                start_time: 60.7,
                word: "for",
              },
              {
                end_time: 60.9,
                start_time: 60.8,
                word: "the",
              },
              {
                end_time: 61.2,
                start_time: 60.9,
                word: "next",
              },
              {
                end_time: 61.4,
                start_time: 61.2,
                word: "two",
              },
              {
                end_time: 61.9,
                start_time: 61.4,
                word: "years.",
              },
            ],
          },
          {
            end_time: 83.6,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 61.9,
            transcript:
              "I fish either here or in Germany from. Yeah. Yeah, right. You're right. Yeah, no. I'm still not very hopeful because this is the kind of thing that we do is. We'll, you know, I thought was a good performance last night. Great result. And then we'll go and lose to Ukraine. You know? And that's, that's the sort of thing that England would like to do.",
            words: [
              {
                end_time: 62,
                start_time: 61.9,
                word: "I",
              },
              {
                end_time: 62.5,
                start_time: 62,
                word: "fish",
              },
              {
                end_time: 64,
                start_time: 63.7,
                word: "either",
              },
              {
                end_time: 64.2,
                start_time: 64,
                word: "here",
              },
              {
                end_time: 64.4,
                start_time: 64.2,
                word: "or",
              },
              {
                end_time: 64.5,
                start_time: 64.4,
                word: "in",
              },
              {
                end_time: 64.9,
                start_time: 64.5,
                word: "Germany",
              },
              {
                end_time: 65.1,
                start_time: 64.9,
                word: "from.",
              },
              {
                end_time: 65.6,
                start_time: 65.1,
                word: "Yeah.",
              },
              {
                end_time: 66.1,
                start_time: 65.6,
                word: "Yeah,",
              },
              {
                end_time: 66.8,
                start_time: 66.4,
                word: "right.",
              },
              {
                end_time: 67,
                start_time: 66.8,
                word: "You're",
              },
              {
                end_time: 67.4,
                start_time: 67,
                word: "right.",
              },
              {
                end_time: 69,
                start_time: 68.6,
                word: "Yeah,",
              },
              {
                end_time: 69.4,
                start_time: 69.1,
                word: "no.",
              },
              {
                end_time: 69.8,
                start_time: 69.4,
                word: "I'm",
              },
              {
                end_time: 70.1,
                start_time: 69.8,
                word: "still",
              },
              {
                end_time: 70.3,
                start_time: 70.1,
                word: "not",
              },
              {
                end_time: 70.5,
                start_time: 70.3,
                word: "very",
              },
              {
                end_time: 70.9,
                start_time: 70.5,
                word: "hopeful",
              },
              {
                end_time: 71.1,
                start_time: 70.9,
                word: "because",
              },
              {
                end_time: 71.2,
                start_time: 71.1,
                word: "this",
              },
              {
                end_time: 71.4,
                start_time: 71.2,
                word: "is",
              },
              {
                end_time: 71.5,
                start_time: 71.4,
                word: "the",
              },
              {
                end_time: 71.8,
                start_time: 71.5,
                word: "kind",
              },
              {
                end_time: 71.9,
                start_time: 71.8,
                word: "of",
              },
              {
                end_time: 72.2,
                start_time: 71.9,
                word: "thing",
              },
              {
                end_time: 72.8,
                start_time: 72.2,
                word: "that",
              },
              {
                end_time: 73,
                start_time: 72.8,
                word: "we",
              },
              {
                end_time: 73.2,
                start_time: 73,
                word: "do",
              },
              {
                end_time: 73.5,
                start_time: 73.2,
                word: "is.",
              },
              {
                end_time: 73.9,
                start_time: 73.5,
                word: "We'll,",
              },
              {
                end_time: 74,
                start_time: 73.9,
                word: "you",
              },
              {
                end_time: 74.3,
                start_time: 74,
                word: "know,",
              },
              {
                end_time: 74.4,
                start_time: 74.3,
                word: "I",
              },
              {
                end_time: 74.6,
                start_time: 74.4,
                word: "thought",
              },
              {
                end_time: 74.7,
                start_time: 74.6,
                word: "was",
              },
              {
                end_time: 74.7,
                start_time: 74.7,
                word: "a",
              },
              {
                end_time: 74.9,
                start_time: 74.7,
                word: "good",
              },
              {
                end_time: 75.4,
                start_time: 74.9,
                word: "performance",
              },
              {
                end_time: 75.7,
                start_time: 75.4,
                word: "last",
              },
              {
                end_time: 76.3,
                start_time: 75.7,
                word: "night.",
              },
              {
                end_time: 76.8,
                start_time: 76.5,
                word: "Great",
              },
              {
                end_time: 77.7,
                start_time: 76.8,
                word: "result.",
              },
              {
                end_time: 77.8,
                start_time: 77.7,
                word: "And",
              },
              {
                end_time: 78,
                start_time: 77.8,
                word: "then",
              },
              {
                end_time: 78.1,
                start_time: 78,
                word: "we'll",
              },
              {
                end_time: 78.3,
                start_time: 78.1,
                word: "go",
              },
              {
                end_time: 78.4,
                start_time: 78.3,
                word: "and",
              },
              {
                end_time: 78.7,
                start_time: 78.4,
                word: "lose",
              },
              {
                end_time: 78.8,
                start_time: 78.7,
                word: "to",
              },
              {
                end_time: 79.5,
                start_time: 78.8,
                word: "Ukraine.",
              },
              {
                end_time: 79.7,
                start_time: 79.6,
                word: "You",
              },
              {
                end_time: 80.1,
                start_time: 79.7,
                word: "know?",
              },
              {
                end_time: 80.7,
                start_time: 80.1,
                word: "And",
              },
              {
                end_time: 81.2,
                start_time: 80.9,
                word: "that's,",
              },
              {
                end_time: 81.5,
                start_time: 81.2,
                word: "that's",
              },
              {
                end_time: 81.6,
                start_time: 81.5,
                word: "the",
              },
              {
                end_time: 81.8,
                start_time: 81.6,
                word: "sort",
              },
              {
                end_time: 81.9,
                start_time: 81.8,
                word: "of",
              },
              {
                end_time: 82,
                start_time: 81.9,
                word: "thing",
              },
              {
                end_time: 82.2,
                start_time: 82,
                word: "that",
              },
              {
                end_time: 82.6,
                start_time: 82.2,
                word: "England",
              },
              {
                end_time: 83,
                start_time: 82.6,
                word: "would",
              },
              {
                end_time: 83.2,
                start_time: 83,
                word: "like",
              },
              {
                end_time: 83.3,
                start_time: 83.2,
                word: "to",
              },
              {
                end_time: 83.6,
                start_time: 83.3,
                word: "do.",
              },
            ],
          },
          {
            end_time: 101.2,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 83.6,
            transcript:
              "I mean, we play piss poorly, so it's not. I thought thing it's now, but like, I mean, look like many. Germans, you read the papers today. Like, I've been firmly of the opinion that Yogi do. Should have gone after the World Cup disaster. Yeah. Like the way they play football, just makes no sense to me. It's like this kind of back passing.",
            words: [
              {
                end_time: 83.7,
                start_time: 83.6,
                word: "I",
              },
              {
                end_time: 83.9,
                start_time: 83.7,
                word: "mean,",
              },
              {
                end_time: 84,
                start_time: 83.9,
                word: "we",
              },
              {
                end_time: 84.4,
                start_time: 84,
                word: "play",
              },
              {
                end_time: 84.9,
                start_time: 84.6,
                word: "piss",
              },
              {
                end_time: 85.4,
                start_time: 84.9,
                word: "poorly,",
              },
              {
                end_time: 86.2,
                start_time: 85.6,
                word: "so",
              },
              {
                end_time: 86.4,
                start_time: 86.2,
                word: "it's",
              },
              {
                end_time: 86.7,
                start_time: 86.4,
                word: "not.",
              },
              {
                end_time: 86.8,
                start_time: 86.7,
                word: "I",
              },
              {
                end_time: 87.1,
                start_time: 86.8,
                word: "thought",
              },
              {
                end_time: 87.3,
                start_time: 87.1,
                word: "thing",
              },
              {
                end_time: 87.5,
                start_time: 87.3,
                word: "it's",
              },
              {
                end_time: 88.4,
                start_time: 88.2,
                word: "now,",
              },
              {
                end_time: 88.6,
                start_time: 88.4,
                word: "but",
              },
              {
                end_time: 88.7,
                start_time: 88.6,
                word: "like,",
              },
              {
                end_time: 88.8,
                start_time: 88.7,
                word: "I",
              },
              {
                end_time: 89,
                start_time: 88.8,
                word: "mean,",
              },
              {
                end_time: 89.2,
                start_time: 89,
                word: "look",
              },
              {
                end_time: 89.6,
                start_time: 89.3,
                word: "like",
              },
              {
                end_time: 89.8,
                start_time: 89.6,
                word: "many.",
              },
              {
                end_time: 90.4,
                start_time: 89.9,
                word: "Germans,",
              },
              {
                end_time: 90.5,
                start_time: 90.4,
                word: "you",
              },
              {
                end_time: 90.7,
                start_time: 90.5,
                word: "read",
              },
              {
                end_time: 90.7,
                start_time: 90.7,
                word: "the",
              },
              {
                end_time: 91.1,
                start_time: 90.7,
                word: "papers",
              },
              {
                end_time: 91.6,
                start_time: 91.1,
                word: "today.",
              },
              {
                end_time: 91.9,
                start_time: 91.6,
                word: "Like,",
              },
              {
                end_time: 92.1,
                start_time: 91.9,
                word: "I've",
              },
              {
                end_time: 92.5,
                start_time: 92.1,
                word: "been",
              },
              {
                end_time: 92.8,
                start_time: 92.5,
                word: "firmly",
              },
              {
                end_time: 92.9,
                start_time: 92.8,
                word: "of",
              },
              {
                end_time: 93,
                start_time: 92.9,
                word: "the",
              },
              {
                end_time: 93.4,
                start_time: 93,
                word: "opinion",
              },
              {
                end_time: 93.5,
                start_time: 93.4,
                word: "that",
              },
              {
                end_time: 93.8,
                start_time: 93.5,
                word: "Yogi",
              },
              {
                end_time: 94,
                start_time: 93.8,
                word: "do.",
              },
              {
                end_time: 94.2,
                start_time: 94,
                word: "Should",
              },
              {
                end_time: 94.4,
                start_time: 94.2,
                word: "have",
              },
              {
                end_time: 94.6,
                start_time: 94.4,
                word: "gone",
              },
              {
                end_time: 94.9,
                start_time: 94.6,
                word: "after",
              },
              {
                end_time: 95,
                start_time: 94.9,
                word: "the",
              },
              {
                end_time: 95.3,
                start_time: 95,
                word: "World",
              },
              {
                end_time: 95.5,
                start_time: 95.3,
                word: "Cup",
              },
              {
                end_time: 96.2,
                start_time: 95.5,
                word: "disaster.",
              },
              {
                end_time: 97.1,
                start_time: 96.6,
                word: "Yeah.",
              },
              {
                end_time: 97.4,
                start_time: 97.2,
                word: "Like",
              },
              {
                end_time: 97.5,
                start_time: 97.4,
                word: "the",
              },
              {
                end_time: 97.7,
                start_time: 97.5,
                word: "way",
              },
              {
                end_time: 97.8,
                start_time: 97.7,
                word: "they",
              },
              {
                end_time: 98,
                start_time: 97.8,
                word: "play",
              },
              {
                end_time: 98.4,
                start_time: 98,
                word: "football,",
              },
              {
                end_time: 98.6,
                start_time: 98.4,
                word: "just",
              },
              {
                end_time: 98.9,
                start_time: 98.6,
                word: "makes",
              },
              {
                end_time: 99,
                start_time: 98.9,
                word: "no",
              },
              {
                end_time: 99.3,
                start_time: 99,
                word: "sense",
              },
              {
                end_time: 99.4,
                start_time: 99.3,
                word: "to",
              },
              {
                end_time: 99.6,
                start_time: 99.4,
                word: "me.",
              },
              {
                end_time: 99.7,
                start_time: 99.6,
                word: "It's",
              },
              {
                end_time: 99.9,
                start_time: 99.7,
                word: "like",
              },
              {
                end_time: 100,
                start_time: 99.9,
                word: "this",
              },
              {
                end_time: 100.2,
                start_time: 100,
                word: "kind",
              },
              {
                end_time: 100.3,
                start_time: 100.2,
                word: "of",
              },
              {
                end_time: 100.6,
                start_time: 100.3,
                word: "back",
              },
              {
                end_time: 101.2,
                start_time: 100.6,
                word: "passing.",
              },
            ],
          },
          {
            end_time: 106.5,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 101.6,
            transcript:
              "I guess. Trying to create space upfront, but then never passing up front.",
            words: [
              {
                end_time: 101.7,
                start_time: 101.6,
                word: "I",
              },
              {
                end_time: 102,
                start_time: 101.7,
                word: "guess.",
              },
              {
                end_time: 102.4,
                start_time: 102,
                word: "Trying",
              },
              {
                end_time: 102.6,
                start_time: 102.4,
                word: "to",
              },
              {
                end_time: 103,
                start_time: 102.6,
                word: "create",
              },
              {
                end_time: 103.3,
                start_time: 103,
                word: "space",
              },
              {
                end_time: 104.1,
                start_time: 103.3,
                word: "upfront,",
              },
              {
                end_time: 104.5,
                start_time: 104.3,
                word: "but",
              },
              {
                end_time: 104.8,
                start_time: 104.5,
                word: "then",
              },
              {
                end_time: 105.3,
                start_time: 104.9,
                word: "never",
              },
              {
                end_time: 105.7,
                start_time: 105.3,
                word: "passing",
              },
              {
                end_time: 105.9,
                start_time: 105.7,
                word: "up",
              },
              {
                end_time: 106.5,
                start_time: 105.9,
                word: "front.",
              },
            ],
          },
          {
            end_time: 131.5,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 106.8,
            transcript:
              "Yeah, it makes no cigarettes. No, I agree. It was, I mean, you were lucky to get out of the group actually hungry, not only but we I felt when when mood I went through it was either it was you were going to win if he scored or if he you know he I mean when he missed that we thought you know made it maybe is coming and changed.",
            words: [
              {
                end_time: 107.2,
                start_time: 106.8,
                word: "Yeah,",
              },
              {
                end_time: 107.6,
                start_time: 107.5,
                word: "it",
              },
              {
                end_time: 107.8,
                start_time: 107.6,
                word: "makes",
              },
              {
                end_time: 108,
                start_time: 107.8,
                word: "no",
              },
              {
                end_time: 108.4,
                start_time: 108,
                word: "cigarettes.",
              },
              {
                end_time: 109.1,
                start_time: 108.6,
                word: "No,",
              },
              {
                end_time: 109.7,
                start_time: 109.1,
                word: "I",
              },
              {
                end_time: 110.1,
                start_time: 109.7,
                word: "agree.",
              },
              {
                end_time: 110.2,
                start_time: 110.1,
                word: "It",
              },
              {
                end_time: 110.5,
                start_time: 110.2,
                word: "was,",
              },
              {
                end_time: 111,
                start_time: 110.9,
                word: "I",
              },
              {
                end_time: 111.2,
                start_time: 111,
                word: "mean,",
              },
              {
                end_time: 111.3,
                start_time: 111.2,
                word: "you",
              },
              {
                end_time: 111.4,
                start_time: 111.3,
                word: "were",
              },
              {
                end_time: 111.7,
                start_time: 111.4,
                word: "lucky",
              },
              {
                end_time: 112.1,
                start_time: 111.7,
                word: "to",
              },
              {
                end_time: 112.8,
                start_time: 112.6,
                word: "get",
              },
              {
                end_time: 113,
                start_time: 112.8,
                word: "out",
              },
              {
                end_time: 113.1,
                start_time: 113,
                word: "of",
              },
              {
                end_time: 113.1,
                start_time: 113.1,
                word: "the",
              },
              {
                end_time: 113.5,
                start_time: 113.1,
                word: "group",
              },
              {
                end_time: 114,
                start_time: 113.5,
                word: "actually",
              },
              {
                end_time: 114.4,
                start_time: 114,
                word: "hungry,",
              },
              {
                end_time: 114.5,
                start_time: 114.4,
                word: "not",
              },
              {
                end_time: 114.9,
                start_time: 114.5,
                word: "only",
              },
              {
                end_time: 117,
                start_time: 116.4,
                word: "but",
              },
              {
                end_time: 117.7,
                start_time: 117.2,
                word: "we",
              },
              {
                end_time: 119,
                start_time: 118.9,
                word: "I",
              },
              {
                end_time: 119.3,
                start_time: 119,
                word: "felt",
              },
              {
                end_time: 119.7,
                start_time: 119.3,
                word: "when",
              },
              {
                end_time: 120,
                start_time: 119.7,
                word: "when",
              },
              {
                end_time: 120.3,
                start_time: 120,
                word: "mood",
              },
              {
                end_time: 120.3,
                start_time: 120.3,
                word: "I",
              },
              {
                end_time: 120.6,
                start_time: 120.3,
                word: "went",
              },
              {
                end_time: 121.1,
                start_time: 120.6,
                word: "through",
              },
              {
                end_time: 121.4,
                start_time: 121.1,
                word: "it",
              },
              {
                end_time: 121.6,
                start_time: 121.4,
                word: "was",
              },
              {
                end_time: 122.3,
                start_time: 121.6,
                word: "either",
              },
              {
                end_time: 122.5,
                start_time: 122.3,
                word: "it",
              },
              {
                end_time: 123.1,
                start_time: 122.5,
                word: "was",
              },
              {
                end_time: 123.6,
                start_time: 123.4,
                word: "you",
              },
              {
                end_time: 123.7,
                start_time: 123.6,
                word: "were",
              },
              {
                end_time: 123.8,
                start_time: 123.7,
                word: "going",
              },
              {
                end_time: 123.9,
                start_time: 123.8,
                word: "to",
              },
              {
                end_time: 124.4,
                start_time: 123.9,
                word: "win",
              },
              {
                end_time: 124.5,
                start_time: 124.4,
                word: "if",
              },
              {
                end_time: 124.7,
                start_time: 124.5,
                word: "he",
              },
              {
                end_time: 125.4,
                start_time: 124.7,
                word: "scored",
              },
              {
                end_time: 125.6,
                start_time: 125.4,
                word: "or",
              },
              {
                end_time: 125.8,
                start_time: 125.6,
                word: "if",
              },
              {
                end_time: 126,
                start_time: 125.8,
                word: "he",
              },
              {
                end_time: 126.1,
                start_time: 126,
                word: "you",
              },
              {
                end_time: 126.3,
                start_time: 126.1,
                word: "know",
              },
              {
                end_time: 126.6,
                start_time: 126.3,
                word: "he",
              },
              {
                end_time: 126.9,
                start_time: 126.9,
                word: "I",
              },
              {
                end_time: 127.1,
                start_time: 126.9,
                word: "mean",
              },
              {
                end_time: 127.3,
                start_time: 127.1,
                word: "when",
              },
              {
                end_time: 127.4,
                start_time: 127.3,
                word: "he",
              },
              {
                end_time: 127.7,
                start_time: 127.4,
                word: "missed",
              },
              {
                end_time: 128,
                start_time: 127.7,
                word: "that",
              },
              {
                end_time: 128.2,
                start_time: 128,
                word: "we",
              },
              {
                end_time: 128.7,
                start_time: 128.2,
                word: "thought",
              },
              {
                end_time: 128.9,
                start_time: 128.8,
                word: "you",
              },
              {
                end_time: 129.2,
                start_time: 128.9,
                word: "know",
              },
              {
                end_time: 129.5,
                start_time: 129.2,
                word: "made",
              },
              {
                end_time: 129.7,
                start_time: 129.5,
                word: "it",
              },
              {
                end_time: 130.2,
                start_time: 129.8,
                word: "maybe",
              },
              {
                end_time: 130.4,
                start_time: 130.2,
                word: "is",
              },
              {
                end_time: 130.9,
                start_time: 130.4,
                word: "coming",
              },
              {
                end_time: 131,
                start_time: 130.9,
                word: "and",
              },
              {
                end_time: 131.5,
                start_time: 131,
                word: "changed.",
              },
            ],
          },
          {
            end_time: 149.7,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 132.2,
            transcript:
              "And the funny thing is and I'm promise I won't talk about football, the whole session, but English fans have a habit. So I'm one of them. I know not interested in English football, you know, in International Football. I'm not getting, I'm not getting involved and then you win a couple of games. Games in the group from your light.",
            words: [
              {
                end_time: 132.6,
                start_time: 132.2,
                word: "And",
              },
              {
                end_time: 132.8,
                start_time: 132.7,
                word: "the",
              },
              {
                end_time: 133.1,
                start_time: 132.8,
                word: "funny",
              },
              {
                end_time: 133.4,
                start_time: 133.1,
                word: "thing",
              },
              {
                end_time: 133.6,
                start_time: 133.4,
                word: "is",
              },
              {
                end_time: 133.8,
                start_time: 133.6,
                word: "and",
              },
              {
                end_time: 134.1,
                start_time: 133.8,
                word: "I'm",
              },
              {
                end_time: 134.9,
                start_time: 134.5,
                word: "promise",
              },
              {
                end_time: 134.9,
                start_time: 134.9,
                word: "I",
              },
              {
                end_time: 135.1,
                start_time: 134.9,
                word: "won't",
              },
              {
                end_time: 135.3,
                start_time: 135.1,
                word: "talk",
              },
              {
                end_time: 135.5,
                start_time: 135.3,
                word: "about",
              },
              {
                end_time: 135.7,
                start_time: 135.5,
                word: "football,",
              },
              {
                end_time: 135.8,
                start_time: 135.7,
                word: "the",
              },
              {
                end_time: 136,
                start_time: 135.8,
                word: "whole",
              },
              {
                end_time: 136.5,
                start_time: 136,
                word: "session,",
              },
              {
                end_time: 137.8,
                start_time: 137.3,
                word: "but",
              },
              {
                end_time: 138.3,
                start_time: 137.8,
                word: "English",
              },
              {
                end_time: 139,
                start_time: 138.3,
                word: "fans",
              },
              {
                end_time: 139.1,
                start_time: 139,
                word: "have",
              },
              {
                end_time: 139.2,
                start_time: 139.1,
                word: "a",
              },
              {
                end_time: 139.6,
                start_time: 139.2,
                word: "habit.",
              },
              {
                end_time: 139.8,
                start_time: 139.6,
                word: "So",
              },
              {
                end_time: 140,
                start_time: 139.8,
                word: "I'm",
              },
              {
                end_time: 140.2,
                start_time: 140,
                word: "one",
              },
              {
                end_time: 140.2,
                start_time: 140.2,
                word: "of",
              },
              {
                end_time: 140.5,
                start_time: 140.2,
                word: "them.",
              },
              {
                end_time: 140.6,
                start_time: 140.5,
                word: "I",
              },
              {
                end_time: 141.2,
                start_time: 140.6,
                word: "know",
              },
              {
                end_time: 141.6,
                start_time: 141.4,
                word: "not",
              },
              {
                end_time: 142.2,
                start_time: 141.6,
                word: "interested",
              },
              {
                end_time: 142.3,
                start_time: 142.2,
                word: "in",
              },
              {
                end_time: 142.7,
                start_time: 142.3,
                word: "English",
              },
              {
                end_time: 143,
                start_time: 142.7,
                word: "football,",
              },
              {
                end_time: 143.2,
                start_time: 143.1,
                word: "you",
              },
              {
                end_time: 143.3,
                start_time: 143.2,
                word: "know,",
              },
              {
                end_time: 143.5,
                start_time: 143.3,
                word: "in",
              },
              {
                end_time: 144.1,
                start_time: 143.5,
                word: "International",
              },
              {
                end_time: 144.7,
                start_time: 144.1,
                word: "Football.",
              },
              {
                end_time: 145.2,
                start_time: 145,
                word: "I'm",
              },
              {
                end_time: 145.4,
                start_time: 145.2,
                word: "not",
              },
              {
                end_time: 145.8,
                start_time: 145.4,
                word: "getting,",
              },
              {
                end_time: 146,
                start_time: 145.8,
                word: "I'm",
              },
              {
                end_time: 146.1,
                start_time: 146,
                word: "not",
              },
              {
                end_time: 146.3,
                start_time: 146.1,
                word: "getting",
              },
              {
                end_time: 147,
                start_time: 146.3,
                word: "involved",
              },
              {
                end_time: 147.1,
                start_time: 147,
                word: "and",
              },
              {
                end_time: 147.2,
                start_time: 147.1,
                word: "then",
              },
              {
                end_time: 147.5,
                start_time: 147.2,
                word: "you",
              },
              {
                end_time: 147.7,
                start_time: 147.5,
                word: "win",
              },
              {
                end_time: 147.8,
                start_time: 147.7,
                word: "a",
              },
              {
                end_time: 148,
                start_time: 147.8,
                word: "couple",
              },
              {
                end_time: 148.1,
                start_time: 148,
                word: "of",
              },
              {
                end_time: 148.3,
                start_time: 148.1,
                word: "games.",
              },
              {
                end_time: 148.5,
                start_time: 148.4,
                word: "Games",
              },
              {
                end_time: 148.6,
                start_time: 148.5,
                word: "in",
              },
              {
                end_time: 148.7,
                start_time: 148.6,
                word: "the",
              },
              {
                end_time: 149.1,
                start_time: 148.7,
                word: "group",
              },
              {
                end_time: 149.2,
                start_time: 149.1,
                word: "from",
              },
              {
                end_time: 149.3,
                start_time: 149.2,
                word: "your",
              },
              {
                end_time: 149.7,
                start_time: 149.3,
                word: "light.",
              },
            ],
          },
          {
            end_time: 159.3,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 150,
            transcript:
              "No, still not. Still not getting involved, then we beat Germany and you like it's coming on. So anyway, just kind of expectations.",
            words: [
              {
                end_time: 150.3,
                start_time: 150,
                word: "No,",
              },
              {
                end_time: 150.6,
                start_time: 150.3,
                word: "still",
              },
              {
                end_time: 150.9,
                start_time: 150.6,
                word: "not.",
              },
              {
                end_time: 151.1,
                start_time: 150.9,
                word: "Still",
              },
              {
                end_time: 151.3,
                start_time: 151.1,
                word: "not",
              },
              {
                end_time: 151.5,
                start_time: 151.3,
                word: "getting",
              },
              {
                end_time: 151.9,
                start_time: 151.5,
                word: "involved,",
              },
              {
                end_time: 152,
                start_time: 151.9,
                word: "then",
              },
              {
                end_time: 152.1,
                start_time: 152,
                word: "we",
              },
              {
                end_time: 152.4,
                start_time: 152.1,
                word: "beat",
              },
              {
                end_time: 152.9,
                start_time: 152.4,
                word: "Germany",
              },
              {
                end_time: 153,
                start_time: 152.9,
                word: "and",
              },
              {
                end_time: 153,
                start_time: 153,
                word: "you",
              },
              {
                end_time: 153.4,
                start_time: 153,
                word: "like",
              },
              {
                end_time: 153.7,
                start_time: 153.5,
                word: "it's",
              },
              {
                end_time: 154,
                start_time: 153.7,
                word: "coming",
              },
              {
                end_time: 154.2,
                start_time: 154,
                word: "on.",
              },
              {
                end_time: 154.5,
                start_time: 154.2,
                word: "So",
              },
              {
                end_time: 154.9,
                start_time: 154.5,
                word: "anyway,",
              },
              {
                end_time: 155.4,
                start_time: 155,
                word: "just",
              },
              {
                end_time: 158.3,
                start_time: 158.1,
                word: "kind",
              },
              {
                end_time: 158.4,
                start_time: 158.3,
                word: "of",
              },
              {
                end_time: 159.3,
                start_time: 158.4,
                word: "expectations.",
              },
            ],
          },
          {
            end_time: 164.2,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 161.1,
            transcript: "That's a big hill to fall from isn't exactly.",
            words: [
              {
                end_time: 161.4,
                start_time: 161.1,
                word: "That's",
              },
              {
                end_time: 161.4,
                start_time: 161.4,
                word: "a",
              },
              {
                end_time: 161.6,
                start_time: 161.4,
                word: "big",
              },
              {
                end_time: 161.8,
                start_time: 161.6,
                word: "hill",
              },
              {
                end_time: 162,
                start_time: 161.8,
                word: "to",
              },
              {
                end_time: 162.2,
                start_time: 162,
                word: "fall",
              },
              {
                end_time: 162.5,
                start_time: 162.2,
                word: "from",
              },
              {
                end_time: 163,
                start_time: 162.5,
                word: "isn't",
              },
              {
                end_time: 164.2,
                start_time: 163.8,
                word: "exactly.",
              },
            ],
          },
          {
            end_time: 172.3,
            speaker: "Speaker A",
            speaker_user: null,
            start_time: 164.2,
            transcript:
              "But no really good to meet you guys. Sorry to get off on the wrong foot anyway. Don't worry, we will share your disappointment next Saturday.",
            words: [
              {
                end_time: 164.4,
                start_time: 164.2,
                word: "But",
              },
              {
                end_time: 164.6,
                start_time: 164.4,
                word: "no",
              },
              {
                end_time: 164.8,
                start_time: 164.6,
                word: "really",
              },
              {
                end_time: 165,
                start_time: 164.8,
                word: "good",
              },
              {
                end_time: 165.1,
                start_time: 165,
                word: "to",
              },
              {
                end_time: 165.2,
                start_time: 165.1,
                word: "meet",
              },
              {
                end_time: 165.3,
                start_time: 165.2,
                word: "you",
              },
              {
                end_time: 165.7,
                start_time: 165.3,
                word: "guys.",
              },
              {
                end_time: 166,
                start_time: 165.7,
                word: "Sorry",
              },
              {
                end_time: 166.1,
                start_time: 166,
                word: "to",
              },
              {
                end_time: 166.2,
                start_time: 166.1,
                word: "get",
              },
              {
                end_time: 166.4,
                start_time: 166.2,
                word: "off",
              },
              {
                end_time: 166.4,
                start_time: 166.4,
                word: "on",
              },
              {
                end_time: 166.5,
                start_time: 166.4,
                word: "the",
              },
              {
                end_time: 166.7,
                start_time: 166.5,
                word: "wrong",
              },
              {
                end_time: 167,
                start_time: 166.7,
                word: "foot",
              },
              {
                end_time: 169.5,
                start_time: 168.9,
                word: "anyway.",
              },
              {
                end_time: 169.7,
                start_time: 169.5,
                word: "Don't",
              },
              {
                end_time: 170,
                start_time: 169.7,
                word: "worry,",
              },
              {
                end_time: 170.3,
                start_time: 170,
                word: "we",
              },
              {
                end_time: 170.4,
                start_time: 170.3,
                word: "will",
              },
              {
                end_time: 170.7,
                start_time: 170.4,
                word: "share",
              },
              {
                end_time: 170.9,
                start_time: 170.7,
                word: "your",
              },
              {
                end_time: 171.6,
                start_time: 170.9,
                word: "disappointment",
              },
              {
                end_time: 171.8,
                start_time: 171.6,
                word: "next",
              },
              {
                end_time: 172.3,
                start_time: 171.8,
                word: "Saturday.",
              },
            ],
          },
          {
            end_time: 207.3,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 172.3,
            transcript:
              "I'm sure that's a good way of thinking. Yeah, exactly, it's great to see you. See you all and and thank you for your inspiring, the time today was fun and Richard Erica. We see, we've been talking about this for a while to get. Can I if I start off and maybe give a little bit of background as to how we've, how where we are where we are now and then I wonder Eric if you could give give a bit of a sense of you know your specific project and what the kind of technical requirements might be and then it will be great to hear from from you guys from Richard.",
            words: [
              {
                end_time: 172.8,
                start_time: 172.3,
                word: "I'm",
              },
              {
                end_time: 173.3,
                start_time: 173.1,
                word: "sure",
              },
              {
                end_time: 173.9,
                start_time: 173.7,
                word: "that's",
              },
              {
                end_time: 174,
                start_time: 173.9,
                word: "a",
              },
              {
                end_time: 174.1,
                start_time: 174,
                word: "good",
              },
              {
                end_time: 174.3,
                start_time: 174.1,
                word: "way",
              },
              {
                end_time: 174.3,
                start_time: 174.3,
                word: "of",
              },
              {
                end_time: 174.6,
                start_time: 174.3,
                word: "thinking.",
              },
              {
                end_time: 175.5,
                start_time: 175,
                word: "Yeah,",
              },
              {
                end_time: 176.1,
                start_time: 175.5,
                word: "exactly,",
              },
              {
                end_time: 177,
                start_time: 176.8,
                word: "it's",
              },
              {
                end_time: 177.3,
                start_time: 177,
                word: "great",
              },
              {
                end_time: 177.8,
                start_time: 177.3,
                word: "to",
              },
              {
                end_time: 177.9,
                start_time: 177.8,
                word: "see",
              },
              {
                end_time: 178,
                start_time: 177.9,
                word: "you.",
              },
              {
                end_time: 178.6,
                start_time: 178.4,
                word: "See",
              },
              {
                end_time: 178.7,
                start_time: 178.6,
                word: "you",
              },
              {
                end_time: 179,
                start_time: 178.7,
                word: "all",
              },
              {
                end_time: 179.3,
                start_time: 179,
                word: "and",
              },
              {
                end_time: 181.1,
                start_time: 180.7,
                word: "and",
              },
              {
                end_time: 181.3,
                start_time: 181.1,
                word: "thank",
              },
              {
                end_time: 181.4,
                start_time: 181.3,
                word: "you",
              },
              {
                end_time: 181.7,
                start_time: 181.4,
                word: "for",
              },
              {
                end_time: 181.8,
                start_time: 181.7,
                word: "your",
              },
              {
                end_time: 182.4,
                start_time: 182,
                word: "inspiring,",
              },
              {
                end_time: 182.5,
                start_time: 182.4,
                word: "the",
              },
              {
                end_time: 182.8,
                start_time: 182.5,
                word: "time",
              },
              {
                end_time: 183.3,
                start_time: 182.8,
                word: "today",
              },
              {
                end_time: 183.5,
                start_time: 183.3,
                word: "was",
              },
              {
                end_time: 183.6,
                start_time: 183.5,
                word: "fun",
              },
              {
                end_time: 184,
                start_time: 183.6,
                word: "and",
              },
              {
                end_time: 184.4,
                start_time: 184,
                word: "Richard",
              },
              {
                end_time: 185.3,
                start_time: 185,
                word: "Erica.",
              },
              {
                end_time: 185.3,
                start_time: 185.3,
                word: "We",
              },
              {
                end_time: 185.4,
                start_time: 185.3,
                word: "see,",
              },
              {
                end_time: 185.6,
                start_time: 185.4,
                word: "we've",
              },
              {
                end_time: 185.9,
                start_time: 185.6,
                word: "been",
              },
              {
                end_time: 186.3,
                start_time: 186,
                word: "talking",
              },
              {
                end_time: 186.5,
                start_time: 186.3,
                word: "about",
              },
              {
                end_time: 186.8,
                start_time: 186.5,
                word: "this",
              },
              {
                end_time: 187.1,
                start_time: 186.8,
                word: "for",
              },
              {
                end_time: 187.1,
                start_time: 187.1,
                word: "a",
              },
              {
                end_time: 187.4,
                start_time: 187.1,
                word: "while",
              },
              {
                end_time: 187.5,
                start_time: 187.4,
                word: "to",
              },
              {
                end_time: 187.7,
                start_time: 187.5,
                word: "get.",
              },
              {
                end_time: 187.9,
                start_time: 187.7,
                word: "Can",
              },
              {
                end_time: 188.2,
                start_time: 187.9,
                word: "I",
              },
              {
                end_time: 188.9,
                start_time: 188.7,
                word: "if",
              },
              {
                end_time: 189,
                start_time: 188.9,
                word: "I",
              },
              {
                end_time: 189.3,
                start_time: 189,
                word: "start",
              },
              {
                end_time: 189.4,
                start_time: 189.3,
                word: "off",
              },
              {
                end_time: 189.5,
                start_time: 189.4,
                word: "and",
              },
              {
                end_time: 189.7,
                start_time: 189.5,
                word: "maybe",
              },
              {
                end_time: 190,
                start_time: 189.7,
                word: "give",
              },
              {
                end_time: 190.3,
                start_time: 190,
                word: "a",
              },
              {
                end_time: 190.5,
                start_time: 190.3,
                word: "little",
              },
              {
                end_time: 190.6,
                start_time: 190.5,
                word: "bit",
              },
              {
                end_time: 190.9,
                start_time: 190.6,
                word: "of",
              },
              {
                end_time: 191.4,
                start_time: 190.9,
                word: "background",
              },
              {
                end_time: 191.5,
                start_time: 191.4,
                word: "as",
              },
              {
                end_time: 191.6,
                start_time: 191.5,
                word: "to",
              },
              {
                end_time: 191.8,
                start_time: 191.6,
                word: "how",
              },
              {
                end_time: 192.1,
                start_time: 191.8,
                word: "we've,",
              },
              {
                end_time: 192.5,
                start_time: 192.3,
                word: "how",
              },
              {
                end_time: 192.8,
                start_time: 192.5,
                word: "where",
              },
              {
                end_time: 193,
                start_time: 192.8,
                word: "we",
              },
              {
                end_time: 193.1,
                start_time: 193,
                word: "are",
              },
              {
                end_time: 193.3,
                start_time: 193.1,
                word: "where",
              },
              {
                end_time: 193.6,
                start_time: 193.3,
                word: "we",
              },
              {
                end_time: 193.9,
                start_time: 193.6,
                word: "are",
              },
              {
                end_time: 194.5,
                start_time: 193.9,
                word: "now",
              },
              {
                end_time: 195.5,
                start_time: 195.4,
                word: "and",
              },
              {
                end_time: 195.6,
                start_time: 195.5,
                word: "then",
              },
              {
                end_time: 195.7,
                start_time: 195.6,
                word: "I",
              },
              {
                end_time: 196,
                start_time: 195.7,
                word: "wonder",
              },
              {
                end_time: 196.2,
                start_time: 196,
                word: "Eric",
              },
              {
                end_time: 196.4,
                start_time: 196.2,
                word: "if",
              },
              {
                end_time: 196.5,
                start_time: 196.4,
                word: "you",
              },
              {
                end_time: 196.7,
                start_time: 196.5,
                word: "could",
              },
              {
                end_time: 197,
                start_time: 196.7,
                word: "give",
              },
              {
                end_time: 197.3,
                start_time: 197.1,
                word: "give",
              },
              {
                end_time: 197.4,
                start_time: 197.3,
                word: "a",
              },
              {
                end_time: 197.5,
                start_time: 197.4,
                word: "bit",
              },
              {
                end_time: 197.6,
                start_time: 197.5,
                word: "of",
              },
              {
                end_time: 197.7,
                start_time: 197.6,
                word: "a",
              },
              {
                end_time: 198,
                start_time: 197.7,
                word: "sense",
              },
              {
                end_time: 198.4,
                start_time: 198,
                word: "of",
              },
              {
                end_time: 198.5,
                start_time: 198.4,
                word: "you",
              },
              {
                end_time: 198.7,
                start_time: 198.5,
                word: "know",
              },
              {
                end_time: 199.3,
                start_time: 199.1,
                word: "your",
              },
              {
                end_time: 200,
                start_time: 199.3,
                word: "specific",
              },
              {
                end_time: 200.7,
                start_time: 200.2,
                word: "project",
              },
              {
                end_time: 201.5,
                start_time: 200.7,
                word: "and",
              },
              {
                end_time: 201.7,
                start_time: 201.5,
                word: "what",
              },
              {
                end_time: 201.8,
                start_time: 201.7,
                word: "the",
              },
              {
                end_time: 202,
                start_time: 201.8,
                word: "kind",
              },
              {
                end_time: 202.1,
                start_time: 202,
                word: "of",
              },
              {
                end_time: 202.4,
                start_time: 202.1,
                word: "technical",
              },
              {
                end_time: 203.2,
                start_time: 202.4,
                word: "requirements",
              },
              {
                end_time: 203.7,
                start_time: 203.3,
                word: "might",
              },
              {
                end_time: 204,
                start_time: 203.7,
                word: "be",
              },
              {
                end_time: 204.1,
                start_time: 204,
                word: "and",
              },
              {
                end_time: 204.2,
                start_time: 204.1,
                word: "then",
              },
              {
                end_time: 204.3,
                start_time: 204.2,
                word: "it",
              },
              {
                end_time: 204.4,
                start_time: 204.3,
                word: "will",
              },
              {
                end_time: 204.6,
                start_time: 204.4,
                word: "be",
              },
              {
                end_time: 204.8,
                start_time: 204.6,
                word: "great",
              },
              {
                end_time: 204.9,
                start_time: 204.8,
                word: "to",
              },
              {
                end_time: 205.1,
                start_time: 204.9,
                word: "hear",
              },
              {
                end_time: 205.4,
                start_time: 205.1,
                word: "from",
              },
              {
                end_time: 206.6,
                start_time: 206.4,
                word: "from",
              },
              {
                end_time: 206.7,
                start_time: 206.6,
                word: "you",
              },
              {
                end_time: 206.9,
                start_time: 206.7,
                word: "guys",
              },
              {
                end_time: 207,
                start_time: 206.9,
                word: "from",
              },
              {
                end_time: 207.3,
                start_time: 207,
                word: "Richard.",
              },
            ],
          },
          {
            end_time: 238.2,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 207.3,
            transcript:
              "A Muslim about You know, whether it whether you can help us and whether it's feasible and, and of interested to do so. So, really briefly the the project that were working on with Eric has emerged from a process here at University of Essex. Why work in the research Enterprise office at University of Essex, and we've been following an idea generation and kind of venture development program for academic colleagues",
            words: [
              {
                end_time: 207.3,
                start_time: 207.3,
                word: "A",
              },
              {
                end_time: 207.7,
                start_time: 207.3,
                word: "Muslim",
              },
              {
                end_time: 208.2,
                start_time: 207.7,
                word: "about",
              },
              {
                end_time: 208.9,
                start_time: 208.8,
                word: "You",
              },
              {
                end_time: 209.1,
                start_time: 208.9,
                word: "know,",
              },
              {
                end_time: 209.9,
                start_time: 209.5,
                word: "whether",
              },
              {
                end_time: 210.3,
                start_time: 209.9,
                word: "it",
              },
              {
                end_time: 210.9,
                start_time: 210.3,
                word: "whether",
              },
              {
                end_time: 211,
                start_time: 210.9,
                word: "you",
              },
              {
                end_time: 211.2,
                start_time: 211,
                word: "can",
              },
              {
                end_time: 211.4,
                start_time: 211.2,
                word: "help",
              },
              {
                end_time: 211.5,
                start_time: 211.4,
                word: "us",
              },
              {
                end_time: 211.6,
                start_time: 211.5,
                word: "and",
              },
              {
                end_time: 211.8,
                start_time: 211.6,
                word: "whether",
              },
              {
                end_time: 212.1,
                start_time: 211.8,
                word: "it's",
              },
              {
                end_time: 212.6,
                start_time: 212.1,
                word: "feasible",
              },
              {
                end_time: 212.9,
                start_time: 212.6,
                word: "and,",
              },
              {
                end_time: 213.1,
                start_time: 212.9,
                word: "and",
              },
              {
                end_time: 213.2,
                start_time: 213.1,
                word: "of",
              },
              {
                end_time: 213.9,
                start_time: 213.2,
                word: "interested",
              },
              {
                end_time: 214.1,
                start_time: 213.9,
                word: "to",
              },
              {
                end_time: 214.3,
                start_time: 214.1,
                word: "do",
              },
              {
                end_time: 214.7,
                start_time: 214.3,
                word: "so.",
              },
              {
                end_time: 215.9,
                start_time: 215.7,
                word: "So,",
              },
              {
                end_time: 216.2,
                start_time: 215.9,
                word: "really",
              },
              {
                end_time: 216.9,
                start_time: 216.2,
                word: "briefly",
              },
              {
                end_time: 217.3,
                start_time: 216.9,
                word: "the",
              },
              {
                end_time: 217.4,
                start_time: 217.3,
                word: "the",
              },
              {
                end_time: 218,
                start_time: 217.4,
                word: "project",
              },
              {
                end_time: 218.4,
                start_time: 218,
                word: "that",
              },
              {
                end_time: 219.8,
                start_time: 219.6,
                word: "were",
              },
              {
                end_time: 220.1,
                start_time: 219.8,
                word: "working",
              },
              {
                end_time: 220.2,
                start_time: 220.1,
                word: "on",
              },
              {
                end_time: 220.4,
                start_time: 220.2,
                word: "with",
              },
              {
                end_time: 221,
                start_time: 220.4,
                word: "Eric",
              },
              {
                end_time: 221.5,
                start_time: 221.3,
                word: "has",
              },
              {
                end_time: 222,
                start_time: 221.5,
                word: "emerged",
              },
              {
                end_time: 222.5,
                start_time: 222,
                word: "from",
              },
              {
                end_time: 222.8,
                start_time: 222.7,
                word: "a",
              },
              {
                end_time: 223.7,
                start_time: 222.8,
                word: "process",
              },
              {
                end_time: 224.4,
                start_time: 224.1,
                word: "here",
              },
              {
                end_time: 224.6,
                start_time: 224.4,
                word: "at",
              },
              {
                end_time: 225,
                start_time: 224.6,
                word: "University",
              },
              {
                end_time: 225.1,
                start_time: 225,
                word: "of",
              },
              {
                end_time: 225.5,
                start_time: 225.1,
                word: "Essex.",
              },
              {
                end_time: 225.9,
                start_time: 225.5,
                word: "Why",
              },
              {
                end_time: 226.1,
                start_time: 225.9,
                word: "work",
              },
              {
                end_time: 226.2,
                start_time: 226.1,
                word: "in",
              },
              {
                end_time: 226.4,
                start_time: 226.2,
                word: "the",
              },
              {
                end_time: 227,
                start_time: 226.7,
                word: "research",
              },
              {
                end_time: 227.6,
                start_time: 227,
                word: "Enterprise",
              },
              {
                end_time: 228,
                start_time: 227.6,
                word: "office",
              },
              {
                end_time: 228,
                start_time: 228,
                word: "at",
              },
              {
                end_time: 228.7,
                start_time: 228.3,
                word: "University",
              },
              {
                end_time: 228.8,
                start_time: 228.7,
                word: "of",
              },
              {
                end_time: 229.1,
                start_time: 228.8,
                word: "Essex,",
              },
              {
                end_time: 229.4,
                start_time: 229.1,
                word: "and",
              },
              {
                end_time: 230.2,
                start_time: 229.9,
                word: "we've",
              },
              {
                end_time: 230.6,
                start_time: 230.2,
                word: "been",
              },
              {
                end_time: 231.4,
                start_time: 230.8,
                word: "following",
              },
              {
                end_time: 232.4,
                start_time: 232.2,
                word: "an",
              },
              {
                end_time: 232.7,
                start_time: 232.4,
                word: "idea",
              },
              {
                end_time: 233.5,
                start_time: 232.7,
                word: "generation",
              },
              {
                end_time: 233.7,
                start_time: 233.5,
                word: "and",
              },
              {
                end_time: 233.9,
                start_time: 233.7,
                word: "kind",
              },
              {
                end_time: 234,
                start_time: 233.9,
                word: "of",
              },
              {
                end_time: 234.7,
                start_time: 234,
                word: "venture",
              },
              {
                end_time: 235.6,
                start_time: 234.7,
                word: "development",
              },
              {
                end_time: 236.6,
                start_time: 235.9,
                word: "program",
              },
              {
                end_time: 237.5,
                start_time: 236.6,
                word: "for",
              },
              {
                end_time: 237.9,
                start_time: 237.5,
                word: "academic",
              },
              {
                end_time: 238.2,
                start_time: 237.9,
                word: "colleagues",
              },
            ],
          },
          {
            end_time: 268.2,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 239,
            transcript:
              "Who've got a new business venture any new proposal to to work up and to develop into something that is potentially market-ready. And and that's been a sort of supportive process over the spring, Eric along with a handful of other academics. Come self-selected, came with great ideas and this is one of the ones that we wanted to support went through a process.",
            words: [
              {
                end_time: 239.2,
                start_time: 239,
                word: "Who've",
              },
              {
                end_time: 239.7,
                start_time: 239.2,
                word: "got",
              },
              {
                end_time: 240,
                start_time: 239.8,
                word: "a",
              },
              {
                end_time: 240.1,
                start_time: 240,
                word: "new",
              },
              {
                end_time: 240.4,
                start_time: 240.1,
                word: "business",
              },
              {
                end_time: 240.7,
                start_time: 240.4,
                word: "venture",
              },
              {
                end_time: 241,
                start_time: 240.7,
                word: "any",
              },
              {
                end_time: 241.6,
                start_time: 241.3,
                word: "new",
              },
              {
                end_time: 242.5,
                start_time: 241.8,
                word: "proposal",
              },
              {
                end_time: 245,
                start_time: 244.3,
                word: "to",
              },
              {
                end_time: 246,
                start_time: 245.8,
                word: "to",
              },
              {
                end_time: 246.3,
                start_time: 246,
                word: "work",
              },
              {
                end_time: 246.5,
                start_time: 246.3,
                word: "up",
              },
              {
                end_time: 246.6,
                start_time: 246.5,
                word: "and",
              },
              {
                end_time: 246.7,
                start_time: 246.6,
                word: "to",
              },
              {
                end_time: 247.4,
                start_time: 246.7,
                word: "develop",
              },
              {
                end_time: 247.6,
                start_time: 247.4,
                word: "into",
              },
              {
                end_time: 248,
                start_time: 247.6,
                word: "something",
              },
              {
                end_time: 248.4,
                start_time: 248,
                word: "that",
              },
              {
                end_time: 248.8,
                start_time: 248.4,
                word: "is",
              },
              {
                end_time: 249.3,
                start_time: 248.8,
                word: "potentially",
              },
              {
                end_time: 250.3,
                start_time: 249.3,
                word: "market-ready.",
              },
              {
                end_time: 250.9,
                start_time: 250.6,
                word: "And",
              },
              {
                end_time: 252,
                start_time: 251.8,
                word: "and",
              },
              {
                end_time: 252.3,
                start_time: 252,
                word: "that's",
              },
              {
                end_time: 252.4,
                start_time: 252.3,
                word: "been",
              },
              {
                end_time: 252.4,
                start_time: 252.4,
                word: "a",
              },
              {
                end_time: 252.6,
                start_time: 252.4,
                word: "sort",
              },
              {
                end_time: 252.9,
                start_time: 252.6,
                word: "of",
              },
              {
                end_time: 253.4,
                start_time: 252.9,
                word: "supportive",
              },
              {
                end_time: 254.2,
                start_time: 253.4,
                word: "process",
              },
              {
                end_time: 255,
                start_time: 254.7,
                word: "over",
              },
              {
                end_time: 255.1,
                start_time: 255,
                word: "the",
              },
              {
                end_time: 255.7,
                start_time: 255.1,
                word: "spring,",
              },
              {
                end_time: 256.8,
                start_time: 256.5,
                word: "Eric",
              },
              {
                end_time: 257,
                start_time: 256.8,
                word: "along",
              },
              {
                end_time: 257.4,
                start_time: 257,
                word: "with",
              },
              {
                end_time: 258,
                start_time: 257.9,
                word: "a",
              },
              {
                end_time: 258.2,
                start_time: 258,
                word: "handful",
              },
              {
                end_time: 258.3,
                start_time: 258.2,
                word: "of",
              },
              {
                end_time: 258.6,
                start_time: 258.3,
                word: "other",
              },
              {
                end_time: 259.2,
                start_time: 258.6,
                word: "academics.",
              },
              {
                end_time: 259.8,
                start_time: 259.6,
                word: "Come",
              },
              {
                end_time: 260.7,
                start_time: 259.8,
                word: "self-selected,",
              },
              {
                end_time: 261.3,
                start_time: 261,
                word: "came",
              },
              {
                end_time: 261.6,
                start_time: 261.3,
                word: "with",
              },
              {
                end_time: 262.1,
                start_time: 261.8,
                word: "great",
              },
              {
                end_time: 262.6,
                start_time: 262.1,
                word: "ideas",
              },
              {
                end_time: 263.2,
                start_time: 262.6,
                word: "and",
              },
              {
                end_time: 263.3,
                start_time: 263.2,
                word: "this",
              },
              {
                end_time: 263.4,
                start_time: 263.3,
                word: "is",
              },
              {
                end_time: 263.5,
                start_time: 263.4,
                word: "one",
              },
              {
                end_time: 263.5,
                start_time: 263.5,
                word: "of",
              },
              {
                end_time: 263.6,
                start_time: 263.5,
                word: "the",
              },
              {
                end_time: 263.8,
                start_time: 263.6,
                word: "ones",
              },
              {
                end_time: 263.9,
                start_time: 263.8,
                word: "that",
              },
              {
                end_time: 264,
                start_time: 263.9,
                word: "we",
              },
              {
                end_time: 264.2,
                start_time: 264,
                word: "wanted",
              },
              {
                end_time: 264.3,
                start_time: 264.2,
                word: "to",
              },
              {
                end_time: 265,
                start_time: 264.3,
                word: "support",
              },
              {
                end_time: 266.6,
                start_time: 266.3,
                word: "went",
              },
              {
                end_time: 266.8,
                start_time: 266.6,
                word: "through",
              },
              {
                end_time: 267.7,
                start_time: 266.8,
                word: "a",
              },
              {
                end_time: 268.2,
                start_time: 267.8,
                word: "process.",
              },
            ],
          },
          {
            end_time: 299.2,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 268.3,
            transcript:
              "s of I suppose nothing is really a boot camp, when it's all done online because obviously everything was done this this way. But it was a, you know, a kind of venture Venture development process. That was that was led by some colleagues in elsewhere, in the research office and leading up to a pitching section. At the end of round about six weeks of training to to propose, some Innovation support at the end of it.",
            words: [
              {
                end_time: 268.5,
                start_time: 268.3,
                word: "s",
              },
              {
                end_time: 269,
                start_time: 268.5,
                word: "of",
              },
              {
                end_time: 270.9,
                start_time: 270.8,
                word: "I",
              },
              {
                end_time: 271.2,
                start_time: 270.9,
                word: "suppose",
              },
              {
                end_time: 271.4,
                start_time: 271.2,
                word: "nothing",
              },
              {
                end_time: 271.5,
                start_time: 271.4,
                word: "is",
              },
              {
                end_time: 271.8,
                start_time: 271.5,
                word: "really",
              },
              {
                end_time: 271.8,
                start_time: 271.8,
                word: "a",
              },
              {
                end_time: 272,
                start_time: 271.8,
                word: "boot",
              },
              {
                end_time: 272.2,
                start_time: 272,
                word: "camp,",
              },
              {
                end_time: 272.3,
                start_time: 272.2,
                word: "when",
              },
              {
                end_time: 272.5,
                start_time: 272.3,
                word: "it's",
              },
              {
                end_time: 272.6,
                start_time: 272.5,
                word: "all",
              },
              {
                end_time: 272.8,
                start_time: 272.6,
                word: "done",
              },
              {
                end_time: 273.1,
                start_time: 272.8,
                word: "online",
              },
              {
                end_time: 273.3,
                start_time: 273.1,
                word: "because",
              },
              {
                end_time: 273.6,
                start_time: 273.3,
                word: "obviously",
              },
              {
                end_time: 273.9,
                start_time: 273.6,
                word: "everything",
              },
              {
                end_time: 274,
                start_time: 273.9,
                word: "was",
              },
              {
                end_time: 274.2,
                start_time: 274,
                word: "done",
              },
              {
                end_time: 274.4,
                start_time: 274.2,
                word: "this",
              },
              {
                end_time: 274.6,
                start_time: 274.4,
                word: "this",
              },
              {
                end_time: 274.8,
                start_time: 274.6,
                word: "way.",
              },
              {
                end_time: 274.9,
                start_time: 274.8,
                word: "But",
              },
              {
                end_time: 275,
                start_time: 274.9,
                word: "it",
              },
              {
                end_time: 275.2,
                start_time: 275,
                word: "was",
              },
              {
                end_time: 275.6,
                start_time: 275.2,
                word: "a,",
              },
              {
                end_time: 275.7,
                start_time: 275.6,
                word: "you",
              },
              {
                end_time: 275.8,
                start_time: 275.7,
                word: "know,",
              },
              {
                end_time: 275.8,
                start_time: 275.8,
                word: "a",
              },
              {
                end_time: 276,
                start_time: 275.8,
                word: "kind",
              },
              {
                end_time: 276.1,
                start_time: 276,
                word: "of",
              },
              {
                end_time: 276.4,
                start_time: 276.1,
                word: "venture",
              },
              {
                end_time: 276.9,
                start_time: 276.4,
                word: "Venture",
              },
              {
                end_time: 277.6,
                start_time: 276.9,
                word: "development",
              },
              {
                end_time: 279.5,
                start_time: 278.9,
                word: "process.",
              },
              {
                end_time: 279.7,
                start_time: 279.5,
                word: "That",
              },
              {
                end_time: 280,
                start_time: 279.7,
                word: "was",
              },
              {
                end_time: 280.2,
                start_time: 280,
                word: "that",
              },
              {
                end_time: 280.3,
                start_time: 280.2,
                word: "was",
              },
              {
                end_time: 280.5,
                start_time: 280.3,
                word: "led",
              },
              {
                end_time: 280.6,
                start_time: 280.5,
                word: "by",
              },
              {
                end_time: 280.8,
                start_time: 280.6,
                word: "some",
              },
              {
                end_time: 281.1,
                start_time: 280.8,
                word: "colleagues",
              },
              {
                end_time: 281.4,
                start_time: 281.1,
                word: "in",
              },
              {
                end_time: 281.8,
                start_time: 281.5,
                word: "elsewhere,",
              },
              {
                end_time: 282,
                start_time: 281.8,
                word: "in",
              },
              {
                end_time: 282.2,
                start_time: 282,
                word: "the",
              },
              {
                end_time: 282.6,
                start_time: 282.2,
                word: "research",
              },
              {
                end_time: 283,
                start_time: 282.6,
                word: "office",
              },
              {
                end_time: 283.6,
                start_time: 283.3,
                word: "and",
              },
              {
                end_time: 283.9,
                start_time: 283.6,
                word: "leading",
              },
              {
                end_time: 284,
                start_time: 283.9,
                word: "up",
              },
              {
                end_time: 284.5,
                start_time: 284,
                word: "to",
              },
              {
                end_time: 284.9,
                start_time: 284.5,
                word: "a",
              },
              {
                end_time: 285.2,
                start_time: 284.9,
                word: "pitching",
              },
              {
                end_time: 285.8,
                start_time: 285.2,
                word: "section.",
              },
              {
                end_time: 287.2,
                start_time: 287.1,
                word: "At",
              },
              {
                end_time: 287.3,
                start_time: 287.2,
                word: "the",
              },
              {
                end_time: 287.5,
                start_time: 287.3,
                word: "end",
              },
              {
                end_time: 288.1,
                start_time: 287.5,
                word: "of",
              },
              {
                end_time: 289,
                start_time: 288.8,
                word: "round",
              },
              {
                end_time: 289.2,
                start_time: 289,
                word: "about",
              },
              {
                end_time: 289.4,
                start_time: 289.2,
                word: "six",
              },
              {
                end_time: 289.7,
                start_time: 289.4,
                word: "weeks",
              },
              {
                end_time: 290.3,
                start_time: 289.7,
                word: "of",
              },
              {
                end_time: 291.3,
                start_time: 290.8,
                word: "training",
              },
              {
                end_time: 293.5,
                start_time: 292.7,
                word: "to",
              },
              {
                end_time: 294.1,
                start_time: 293.6,
                word: "to",
              },
              {
                end_time: 295.2,
                start_time: 294.3,
                word: "propose,",
              },
              {
                end_time: 297.2,
                start_time: 296.7,
                word: "some",
              },
              {
                end_time: 298.2,
                start_time: 297.7,
                word: "Innovation",
              },
              {
                end_time: 298.5,
                start_time: 298.2,
                word: "support",
              },
              {
                end_time: 298.6,
                start_time: 298.5,
                word: "at",
              },
              {
                end_time: 298.7,
                start_time: 298.6,
                word: "the",
              },
              {
                end_time: 298.8,
                start_time: 298.7,
                word: "end",
              },
              {
                end_time: 298.9,
                start_time: 298.8,
                word: "of",
              },
              {
                end_time: 299.2,
                start_time: 298.9,
                word: "it.",
              },
            ],
          },
          {
            end_time: 302,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 299.4,
            transcript: "And that's Yes, that's Eriksen.",
            words: [
              {
                end_time: 299.5,
                start_time: 299.4,
                word: "And",
              },
              {
                end_time: 299.8,
                start_time: 299.5,
                word: "that's",
              },
              {
                end_time: 300.1,
                start_time: 300,
                word: "Yes,",
              },
              {
                end_time: 300.5,
                start_time: 300.2,
                word: "that's",
              },
              {
                end_time: 302,
                start_time: 301.6,
                word: "Eriksen.",
              },
            ],
          },
          {
            end_time: 326.8,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 315.3,
            transcript:
              "Sorry, one moment. I think I did something and I lost, I lost my sound. Maybe you can hear me, but I cannot hear anything. Just one moment, please.",
            words: [
              {
                end_time: 315.8,
                start_time: 315.3,
                word: "Sorry,",
              },
              {
                end_time: 316.7,
                start_time: 316.5,
                word: "one",
              },
              {
                end_time: 317,
                start_time: 316.7,
                word: "moment.",
              },
              {
                end_time: 317.1,
                start_time: 317,
                word: "I",
              },
              {
                end_time: 317.4,
                start_time: 317.1,
                word: "think",
              },
              {
                end_time: 318.1,
                start_time: 317.4,
                word: "I",
              },
              {
                end_time: 318.9,
                start_time: 318.7,
                word: "did",
              },
              {
                end_time: 319.4,
                start_time: 318.9,
                word: "something",
              },
              {
                end_time: 319.5,
                start_time: 319.4,
                word: "and",
              },
              {
                end_time: 319.6,
                start_time: 319.5,
                word: "I",
              },
              {
                end_time: 320.2,
                start_time: 319.6,
                word: "lost,",
              },
              {
                end_time: 320.3,
                start_time: 320.3,
                word: "I",
              },
              {
                end_time: 320.6,
                start_time: 320.3,
                word: "lost",
              },
              {
                end_time: 320.9,
                start_time: 320.6,
                word: "my",
              },
              {
                end_time: 321.5,
                start_time: 320.9,
                word: "sound.",
              },
              {
                end_time: 321.9,
                start_time: 321.6,
                word: "Maybe",
              },
              {
                end_time: 322,
                start_time: 321.9,
                word: "you",
              },
              {
                end_time: 322.2,
                start_time: 322,
                word: "can",
              },
              {
                end_time: 322.5,
                start_time: 322.2,
                word: "hear",
              },
              {
                end_time: 322.6,
                start_time: 322.5,
                word: "me,",
              },
              {
                end_time: 322.8,
                start_time: 322.6,
                word: "but",
              },
              {
                end_time: 322.8,
                start_time: 322.8,
                word: "I",
              },
              {
                end_time: 323.2,
                start_time: 322.8,
                word: "cannot",
              },
              {
                end_time: 323.4,
                start_time: 323.2,
                word: "hear",
              },
              {
                end_time: 324,
                start_time: 323.4,
                word: "anything.",
              },
              {
                end_time: 325.7,
                start_time: 325.3,
                word: "Just",
              },
              {
                end_time: 325.9,
                start_time: 325.7,
                word: "one",
              },
              {
                end_time: 326.3,
                start_time: 325.9,
                word: "moment,",
              },
              {
                end_time: 326.8,
                start_time: 326.3,
                word: "please.",
              },
            ],
          },
          {
            end_time: 329.7,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 328.3,
            transcript: "Trying to fix it.",
            words: [
              {
                end_time: 328.7,
                start_time: 328.3,
                word: "Trying",
              },
              {
                end_time: 328.9,
                start_time: 328.7,
                word: "to",
              },
              {
                end_time: 329.3,
                start_time: 328.9,
                word: "fix",
              },
              {
                end_time: 329.7,
                start_time: 329.3,
                word: "it.",
              },
            ],
          },
          {
            end_time: 361.8,
            speaker: "Speaker C",
            speaker_user: null,
            start_time: 359.7,
            transcript: "I will try to leave and join again.",
            words: [
              {
                end_time: 359.8,
                start_time: 359.7,
                word: "I",
              },
              {
                end_time: 359.9,
                start_time: 359.8,
                word: "will",
              },
              {
                end_time: 360.1,
                start_time: 359.9,
                word: "try",
              },
              {
                end_time: 360.3,
                start_time: 360.1,
                word: "to",
              },
              {
                end_time: 360.6,
                start_time: 360.3,
                word: "leave",
              },
              {
                end_time: 361.1,
                start_time: 360.6,
                word: "and",
              },
              {
                end_time: 361.4,
                start_time: 361.1,
                word: "join",
              },
              {
                end_time: 361.8,
                start_time: 361.4,
                word: "again.",
              },
            ],
          },
          {
            end_time: 362.8,
            speaker: "Speaker B",
            speaker_user: null,
            start_time: 361.8,
            transcript: "So just one moment.",
            words: [
              {
                end_time: 362.1,
                start_time: 361.8,
                word: "So",
              },
              {
                end_time: 362.3,
                start_time: 362.1,
                word: "just",
              },
              {
                end_time: 362.5,
                start_time: 362.3,
                word: "one",
              },
              {
                end_time: 362.8,
                start_time: 362.5,
                word: "moment.",
              },
            ],
          },
        ],
      },
      isPaused: true,
      currentPart: 0,
      currentWord: 0, 
      tick: setInterval(() => {
        if(!this.isPaused){
          if(this.$refs.player.paused){
            this.$refs.player.play()
          }else{
            let current = this.data.transcript[this.currentPart].words;
            if(current[this.currentWord].start_time < this.$refs.player.currentTime){
              this.$refs[`${this.currentPart}words${this.currentWord}`][0].style.color = "red";
              if(this.currentWord == current.length - 1){
                this.currentPart++;
                this.currentWord = 0;
              }else{
                this.currentWord++;
              }
            }
          }
        }
      } , 10),
      user: "Speaker A",
      musicSrc: "http://poc.altadoctrina.ai/audio.mp3",
    };
  },

  computed:{
  },

  methods: {

    addZero(num){
      if(num < 10) return '0' + num;
      else return num;
    },
    parseTime(time){
      const t = parseInt(time);
      return this.addZero(parseInt(t/3600)) + ":" + this.addZero(parseInt((t%3600)/60)) + ":" + this.addZero(t%60);
    },
    click(id) {
      this.data.transcript.forEach((item , idx)=> {
        item.words.forEach((word , iidx) => {
          this.$refs[`${idx}words${iidx}`][0].style.color = "black"
        })
      })
      this.currentPart = id;
      this.currentWord = 0;
      this.$refs.player.currentTime = this.data.transcript[this.currentPart].start_time;
      this.isPaused = false;
    },


  },
};
</script>
