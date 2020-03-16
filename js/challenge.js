const body = document.querySelector("body")
const likesList = document.querySelector(".likes")
// Counter Starts and adds 1 every second
const counter = document.querySelector("#counter")
const timerFn = function() {
    counter.innerText = parseInt(counter.innerText) + 1
}
let timer = setInterval(timerFn, 1000)
let timerInterval = true

const counterLikeHash = {}
const pauseAndResumeButton = document.getElementById("pause")

body.addEventListener("click", event => {
    // console.log(event.target)
    if (event.target.id === "minus") {
        counter.innerText = parseInt(counter.innerText) - 1
    } else if (event.target.id === "plus") {
        counter.innerText = parseInt(counter.innerText) + 1
    } else if (event.target.id === "heart") {
        renderLike(parseInt(counter.innerText))
    } else if (event.target.id ==="pause") {
        if (timerInterval === true) {
            timer = clearInterval(timer)
            pauseAndResumeButton.innerHTML = "resume"
            document.getElementById("minus").disabled = true;
            document.getElementById("plus").disabled = true;
            document.getElementById("heart").disabled = true;
            timerInterval = false
        } else {
            timer = setInterval(timerFn, 1000)
            pauseAndResumeButton.innerHTML = "pause"
            document.getElementById("minus").disabled = false;
            document.getElementById("plus").disabled = false;
            document.getElementById("heart").disabled = false;
            timerInterval = true
        }
    }
})

function renderLike(counterNumber) {
    if (counterLikeHash[counterNumber]) {
        counterLikeHash[counterNumber] = counterLikeHash[counterNumber] + 1
        const theLike = document.getElementById(`${counterNumber}`)
        theLike.innerHTML = `${counterNumber} has been liked ${counterLikeHash[counterNumber]} times`
    } else {
        const likeLi = document.createElement("li")
        likeLi.id = `${counterNumber}`
        counterLikeHash[counterNumber] = 1
        likeLi.innerHTML = `${counterNumber} has been liked ${counterLikeHash[counterNumber]} time`
        likesList.append(likeLi)
    }
}

const commentList = document.querySelector("#list")
const commentForm = document.querySelector("#comment-form")
commentForm.addEventListener("submit", handleCommentFormSubmit)


function handleCommentFormSubmit(event) {
    event.preventDefault()
    const form = event.target
    newComment = {
        text: event.target["comment"].value
    }
    renderComment(newComment)
    form.reset()
}

function renderComment(comment) {
    const commentLi = document.createElement("li")
    commentLi.innerHTML = `${comment.text}`
    commentList.append(commentLi)
}