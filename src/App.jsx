import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foods, setFoods] = useState([])

  useEffect(() => {
    const fetchFoods = async () => {
      console.log("in fetch foods")
      const {data} = await axios.get('http://localhost:3000/api/food/')
      setFoods(data)
    }

    fetchFoods()
  }, [])

  const deleteFood = async(foodz) => {
    console.log(foodz)
    try {
      await axios.delete(`http://localhost:3000/api/food/${foodz.id}`)
      const newFoods = foods.filter((food) => {
        return food.id !== foodz.id 
      })
      setFoods(newFoods)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>My foods - {foods.length}</h1>
      {
        foods.map((food) => {
          return (
            <div key={food.id}>
              {food.name}
              <button onClick={() => {deleteFood(food)}}>X</button>  
            </div>
          )
        })
      }
    </div>
    
  )
}

export default App
