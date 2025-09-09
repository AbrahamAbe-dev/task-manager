
const dom = {
  taskID: document.querySelector('.task-edit-id'),
  taskName: document.querySelector('.task-edit-name'),
  taskCompleted: document.querySelector('.task-edit-completed'),
  editForm: document.querySelector('.single-task-form'),
  editBtn: document.querySelector('.task-edit-btn'),
  formAlert: document.querySelector('.form-alert')
}



const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName


// Fetch single task
const showTask = async () => {
  try {
    // const { data: { task } } = await axios.get(`/api/v1/tasks/getOne/${id}`)

    const res = await axios.get(`/api/v1/tasks/getOne/${id}`);
    const task = res.data.task ?? res.data;

    const { id: taskId, completed, name } = task;

    dom.taskID.textContent = taskId
    dom.taskName.value = name ?? '';
    tempName = dom.taskName.value;
    dom.taskCompleted.checked = !!completed;
  } catch (error) {
    console.error('Error fetching task:', error);
  }
};




// Update task
dom.editForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  dom.editBtn.textContent = 'Loading...';

  const taskName = (dom.taskName.value || '').trim();
  const taskCompleted = !!dom.taskCompleted.checked;

  try {

    const res = await axios.put(`/api/v1/tasks/update/${id}`,
        { name: taskName, completed: taskCompleted });

    const task = res.data.task ?? res.data;

    const { id: taskId, completed, name } = task


    dom.taskID.textContent = taskId;
    dom.taskName.value = name ?? '';
    tempName = dom.taskName.value;
    dom.taskCompleted.checked = !! completed;

    dom.formAlert.style.display = 'block'
    dom.formAlert.textContent = `success, edited task`
    dom.formAlert.classList.add('text-success')
  } catch (error) {
    console.error(error)
    dom.taskName.value = tempName
    dom.formAlert.style.display = 'block'
    dom.formAlert.innerHTML = `error, please try again`
  }
  dom.editBtn.textContent = 'Edit'
  setTimeout(() => {
    dom.formAlert.style.display = 'none'
    dom.formAlert.classList.remove('text-success')
  }, 3000)
})
showTask()