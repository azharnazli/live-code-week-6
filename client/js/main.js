var baseUrl = `http://localhost:3000/`

new Vue({
  el: '#app',
  data: {
    isLogin: false,
    email: '',
    password: '',
    jokesRandom: '',
    jokeId: '',
    myjokes:[]
  },
  created: function () {
    this.checkLogin()
    this.generateJokes()
    this.fetchMydata()
  },
  methods: {
    generateJokes: function () {
      axios.get(baseUrl + 'getJokes')
        .then(({
          data
        }) => {
          this.jokesRandom = data.joke
          this.jok = data.id
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginUser: function () {
      axios.post(baseUrl + 'login', {
          email: this.email,
          password: this.password
        })
        .then(({
          data
        }) => {
          localStorage.setItem('token', data)
          this.isLogin = true
          this.fetchMydata()
        })
        .catch(err => {
          swal({
            title: "Error!",
            text: 'email or password is wrong',
            icon: "warning",
            button: "ok!",
          });
        })
    },
    checkLogin: function () {
      if (localStorage.getItem('token')) {
        this.isLogin = true
      }
    },
    logoutUser: function () {
      localStorage.removeItem('token')
      this.isLogin = false
    },
    addFavorite: function () {
      axios.post(baseUrl + 'favorites', {
          jokes: this.jokesRandom
        }, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then((data) => {
          this.generateJokes()
          swal("Good job!", "You clicked the button!", "success");
          this.fetchMydata()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchMydata: function () {
      axios.get(baseUrl + 'favorites', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          this.myjokes = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteFav : function(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          axios.delete(baseUrl + `favorites/${id}`,{
            headers : {
              token : localStorage.getItem('token')
            }
          })
          .then((data)=> {
            this.fetchMydata()
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          swal("Your imaginary file is safe!");
        }
      });

    
     
      
      
    }
  }
})