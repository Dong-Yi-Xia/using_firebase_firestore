const cafeList = document.querySelector('#cafe-list')
const form = document.querySelector('#add-cafe-form')


// create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li')
    let name = document.createElement('span')
    let city = document.createElement('span')
    let cross = document.createElement('div')

    //the doc.id is the auto-generated id from the document in a collection       
    li.setAttribute('data-id', doc.id)
     //using the data() will give you the actual data, its field property
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = 'X'

    //append the element onto the DOM
    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    cafeList.appendChild(li)

    //DELETING DATA
    cross.addEventListener('click', (evt)=>{
        // evt.stopPropagation() is optional 
        evt.stopPropagation()
        //the cross is a child of li, the li has the attribute, to get the document id 
        let id = evt.target.parentElement.getAttribute('data-id')
        //finding a single document inside a collection, use the doc() and pass in the id
        //use the delete() to remove it from the database
        db.collection('cafes').doc(id).delete()
    })
}

// GETTING DATA
//first create the collection name in the firestore database on the firebase website. 
//using collection() will get all the documents  
//the get() give back a snapshot, a data that is async 
//using the where() to get more specific data
//db.collection('cafes').where('city', '==', 'Underground').get()
//the where() takes three parameters: a field to filter on, a comparison operator, and a value.
//using the orderBy() to sort the data
//db.collection('cafes').where('city', '==', 'Underground').orderBy('name').get() 
//complex sort give us an index error, fix by clicking on console error to redirect to firestore, 
//under the firestore indexes, create new index
db.collection('cafes').where('city', '==', 'Underground').orderBy('name').get()
    .then((snapshot) => {
        //snapshot.docs will get you the array of all the documents 
        //console.log(snapshot.docs)
        snapshot.docs.forEach(doc => {
            //using the data() will give you the actual data, its field property
            // console.log(doc.data())
            renderCafe(doc)
        })
    })


// SAVING DATA    
form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    //using the add() to add it to the collection
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })
    //clear the form
    form.name.value = ''
    form.city.value = ''
})