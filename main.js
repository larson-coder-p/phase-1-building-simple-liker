// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select the heart icons and error modal
  const heartIcons = document.querySelectorAll('.heart');
  const errorModal = document.querySelector('#error-modal');
  const errorMessage = document.querySelector('#error-message');
  document.addEventListener('DOMContentLoaded', () => {
    const heartIcons = document.querySelectorAll('.heart');
    const errorModal = document.querySelector('#error-modal');
    const errorMessage = document.querySelector('#error-message');
  
    function handleServerResponse(heart) {
      mimicServerCall()
        .then(() => {
          heart.classList.remove('empty-heart');
          heart.classList.add('full-heart', 'activated-heart');
        })
        .catch((error) => {
          errorMessage.textContent = error.message; // Set error message
          if (errorModal) {
            errorModal.classList.remove('hidden'); // Show the modal
            setTimeout(() => {
              errorModal.classList.add('hidden'); // Hide the modal after 3 seconds
            }, 3000);
          } else {
            console.error('Error modal not found.');
          }
        });
    }
  
    heartIcons.forEach(heart => {
      heart.addEventListener('click', () => {
        if (heart.classList.contains('empty-heart')) {
          handleServerResponse(heart);
        } else if (heart.classList.contains('full-heart')) {
          heart.classList.remove('full-heart', 'activated-heart');
          heart.classList.add('empty-heart');
        }
      });
    });
  });
  

  // Add click event listeners to each heart icon
  heartIcons.forEach(heart => {
    heart.addEventListener('click', () => {
      if (heart.classList.contains('empty-heart')) {
        // User clicked on an empty heart
        handleServerResponse(heart);
      } else if (heart.classList.contains('full-heart')) {
        // User clicked on a full heart
        heart.classList.remove('full-heart', 'activated-heart');
        heart.classList.add('empty-heart');
      }
    });
  });
});





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
