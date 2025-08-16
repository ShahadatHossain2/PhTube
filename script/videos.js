// const loadVideos = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
//     const data = await res.json()
//     displayVideos(data.videos)
// }

// const getTime = (time) => {
//     const hour = parseInt(time / 3600);
//     const min = parseInt((time % 3600) / 60);
//     return hour +"hrs " + min +" min ago";
// }

// function displayVideos(videos) {
//     videos.forEach(video => {
//         const div = document.createElement('div')
//         div.classList = "card shadow-sm"
//         div.innerHTML =
//             ` 
//          <figure class="h-[200px] relative">
//             <img class="h-full w-full object-cover" src=${video.thumbnail} alt="">
//             ${video.others.posted_date.length == 0 ? "" : `<span class="absolute text-white right-2 bottom-2 rounded p-1 bg-black">${video.others.posted_date}</span>`}
//         </figure>
//         <div class="px-0 py-2 flex gap-2">
//             <div class="">
//                 <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
//             </div>
//             <div>
//                 <h2 class="font-bold">${video.title}</h2>
//                 <div class="flex items-center gap-2">
//                     <p class="text-gray-400">${video.authors[0].profile_name}</p>
//                     ${video.authors[0].verified === true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img> ` : ""}
                    
//                 </div>
//                 <p class="text-gray-400">${video.others.views} </p>
                
//             </div>
            
//         </div>   
//         `
//         document.getElementById('videos').appendChild(div)
//         console.log(video)
//     });
// }


// loadVideos()