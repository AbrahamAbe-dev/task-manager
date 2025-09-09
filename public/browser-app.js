const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')



// FORM
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/api/v1/tasks/create', { name })
    await showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})


// Load tasks from /api/tasks
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
  
    const res = await axios.get('/api/v1/tasks/list')

    // adjust this line depending on the API response
    const tasks = res.data.tasks || res.data

    if (!Array.isArray(tasks) || tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      return
    }

    // Render to HTML
    tasksDOM.innerHTML = tasks.map(({ id, name, completed }) =>
           `<div class="single-task ${completed ? 'task-completed' : ''}">
                
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">

                  <!-- edit link -->
                  <a href="task.html?id=${id}"  class="edit-link">
                  <i class="fas fa-edit"></i>
                  </a>
                  <!-- delete btn -->
                  <button type="button" class="delete-btn" data-id="${id}">
                  <i class="fas fa-trash"></i>
                  </button>
                  
                </div>
                </div>`
    ).join('')

  } catch (error) {
    console.error('Error loading tasks:', error);
    tasksDOM.innerHTML =
        '<h5 class="empty-list">There was an error, please try later....</h5>'
  } finally {
    loadingDOM.style.visibility = 'hidden'
  }

}

showTasks()




// delete task
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'block'
    const id = el.parentElement.dataset.id
    try {
      await axios.get(`/api/v1/tasks/delete/${id}`)
      showTasks()
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})


