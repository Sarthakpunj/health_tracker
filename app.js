// Initialize fitness metrics
let fitnessData = {
    steps: 0,
    calories: 0,
    currentActivity: "None"
  };
  
  // Retrieve saved goal and fitness data from localStorage if available
  let userGoal = parseInt(localStorage.getItem("goal")) || 0;
  fitnessData.steps = parseInt(localStorage.getItem("steps")) || 0;
  fitnessData.calories = parseFloat(localStorage.getItem("calories")) || 0;
  
  // Display saved goal if available
  document.getElementById("goalMessage").innerText = `Your goal: ${userGoal} steps`;
  
  // Set daily goal
  function setGoal() {
    const goalInput = document.getElementById("goalInput").value;
    userGoal = parseInt(goalInput);
    localStorage.setItem("goal", userGoal);
    document.getElementById("goalMessage").innerText = `Your goal: ${userGoal} steps`;
  }
  
  // Function to simulate IMU data for each activity
  function simulateIMUData(activity) {
    if (activity === "walking") {
      return { steps: randomInt(100, 200), calorieRate: 0.04 }; // steps, calories per step
    } else if (activity === "running") {
      return { steps: randomInt(200, 300), calorieRate: 0.08 };
    } else if (activity === "cycling") {
      return { steps: 0, calorieRate: 0.1 }; // cycling is based on calories only
    } else if (activity === "exercise") {
      return { steps: 0, calorieRate: 0.12 };
    }
    return { steps: 0, calorieRate: 0 };
  }
  
  // Track activity and update fitness metrics
  function trackActivity(activity) {
    const { steps, calorieRate } = simulateIMUData(activity);
    
    // Update metrics
    fitnessData.steps += steps;
    fitnessData.calories += steps * calorieRate;
    fitnessData.currentActivity = activity.charAt(0).toUpperCase() + activity.slice(1);
  
    // Save metrics in localStorage
    localStorage.setItem("steps", fitnessData.steps);
    localStorage.setItem("calories", fitnessData.calories);
  
    // Update UI with new data
    document.getElementById("steps").innerText = fitnessData.steps;
    document.getElementById("calories").innerText = fitnessData.calories.toFixed(2);
    document.getElementById("currentActivity").innerText = fitnessData.currentActivity;
  }
  
  // Utility function to get random integer within a range
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  