const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    const data = await res.json()
    displayCategory(data.categories)
}

// Different way

// const removeActive = () =>{
//     const buttons = document.getElementsByClassName('category-btn');
//     for (const button of buttons) {
//         button.classList.remove("active")
//     }
// }

const categoryVideos = async (id) => {
    // fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    // .then (res => res.json())
    // .then (data => {
    //     removeActive()
    //     document.getElementById("btn-"+id).classList.add("active")
    //     displayVideos(data.category)
    // })
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    document.getElementById("btn-" + id).classList.add("active")
    displayVideos(data.category)
    document.getElementById("sortButton").addEventListener('click', ()=>{
       sortByView(data.category) 
    })
}

const loadDetails = async (videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json()
    showVideoDetails(data.video)
}

const showVideoDetails = (details) => {
    const contentBox = document.getElementById('modalContent')
    contentBox.innerHTML = `
    <img class="h-full w-full rounded" src=${details.thumbnail} alt="">
    <p> ${details.description} </p>
    `

    // way - 1
    // document.getElementById('modalButton').onclick()
    // way - 2
    document.getElementById('my_modal_1').showModal()
}

function displayCategory(categories) {
    categories.forEach(categoryList => {
        const btnContainer = document.createElement('div')
        btnContainer.classList = "my-2"
        btnContainer.innerHTML = `
        <button id="btn-${categoryList.category_id}" onClick = "categoryVideos(${categoryList.category_id})" class="btn category-btn">
        ${categoryList.category}
        </button>
        `
        document.getElementById('category').append(btnContainer)
    });

}

const loadVideos = async (videoTitle = "") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${videoTitle}`)
    const data = await res.json()
    displayVideos(data.videos)
    document.getElementById("logoImg").style.cursor = "pointer"
    document.getElementById("sortButton").addEventListener('click', ()=>{
       sortByView(data.videos) 
    })
    document.getElementById("logoImg").addEventListener('click', ()=>{
           displayVideos(data.videos)
    })
}

const getTime = (time) => {
    const hour = parseInt(time / 3600);
    const min = parseInt((time % 3600) / 60);
    return hour + "hrs " + min + " min ago";
}

function displayVideos(videos) {
    const container = document.getElementById('videos')
    container.innerHTML = ""
    if (videos.length == 0) {
        console.log("Gelo")
        container.classList.remove("grid")
        return container.innerHTML = `
      <div class="w-2/12 mx-auto mt-10">
        <img src="/resource/icon.png" alt="">
        <h2>
        No Content in this Category
        </h2>
      </div>
      `
    }
    else {
        container.classList.add("grid")
    }
    videos.forEach(video => {
        const div = document.createElement('div')
        div.classList = "card shadow-sm"
        div.innerHTML =
            ` 
         <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover" src=${video.thumbnail} alt="">
            ${video.others.posted_date.length == 0 ? "" : `<span class="absolute text-white right-2 bottom-2 rounded p-1 bg-black">${getTime(video.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div class="">
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} alt="">
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? `<img class="h-5 w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""></img> ` : ""}
                    
                </div>
                <p class="text-gray-400">${video.others.views} </p>
                <span><button class="btn btn-sm btn-error" onClick = "loadDetails('${video.video_id}')" class="btn category-btn">details
        </button></span>
                
            </div>
            
        </div>   
        `
        document.getElementById('videos').appendChild(div)
        // console.log(video)
    });
}

document.getElementById('searchVideo').addEventListener('keyup', (event) => {
    const inputValue = event.target.value;
    loadVideos(inputValue)
})

const sortByView = (videos) => {
    
    videos.sort((a, b) =>
        b.others.views.split("K")[0] - a.others.views.split("K")[0]
    )
     displayVideos(videos)
}

loadVideos()
loadCategory()