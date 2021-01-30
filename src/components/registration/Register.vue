<template>
  <div class=" container  rounded  reg-border  ">
    <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
    />
    <div v-if="!successful" class="reg-form-style">

      <div class="form-group ">
        <el-input
            type="text"
            placeholder="username"
            v-model="user.username"
            v-validate="'required|min:3|max:20'"
        />
        <div
            class="alert-danger"
            v-if="submitted && errors.has('username')"
        >{{ errors.first('username') }}
        </div>
      </div>
      <div class="form-group">
        <el-input
            type="email"
            placeholder="email"
            v-model="user.email"
            v-validate="'required|email|max:50'"
        />
        <div
            class="alert-danger"
            v-if="submitted && errors.has('email')"
        >{{ errors.first('email') }}
        </div>
      </div>
      <div class="form-group">
        <el-input
            type="password"
            placeholder="password"
            @change="validatePass()"
            v-model="user.password"
            v-validate="'required|min:6|max:40'"
        />
        <div
            class="alert-danger"
            v-if="submitted && errors.has('password')"
        >{{ errors.first('password') }}
        </div>
      </div>
      <div class="form-group">
        <el-input
            type="password"
            placeholder="password"
            @change="validatePass()"
            v-model="passwordTemp"
            v-validate="'required|min:6|max:40'"
        />

        <div
            class="alert-danger"
            v-if="passValidateMsg"
        >
          {{ $ml.get('msg.wrongMatchPass') }}
        </div>
      </div>
      <el-button
          @click="handleRegister()"
          :loading="loading" type="primary"
          class="btn-block"
      >{{ $ml.get('word.registration') }}
      </el-button>

    </div>

    <div
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
        v-if="message"
    >{{ message }}
    </div>

  </div>

</template>

<script>
import User from "../../models/user";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "register",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    ...mapGetters([
      'REGISTRATION_LOADING'
    ])
  },
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      passValidateMsg: false,
      loading: false,
      passValidate: false,
      passwordTemp: '',
      message: ""
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions([
      'REGISTRATION',
    ]),
    validatePass() {
      if (this.passwordTemp !== '' && this.passwordTemp !== this.user.password) {
        this.passValidateMsg = true
      } else if (this.passwordTemp !== '') {
        this.passValidate = true
        this.passValidateMsg = false
      } else {
        this.passValidateMsg = false
        this.passValidate = false
      }
    },
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.validatePass()
      this.$validator.validate().then(valid => {
        if (valid && this.passValidate) {
          this.loading = true
          // this.REGISTRATION(this.user).then(resp => {
          //   console.log(resp)
          //   this.loading = false
          //   this.$message({
          //     showClose: true,
          //     type: 'success',
          //     message: 'регистрация прошла успешно. Сообщение с подтверждением выслано вам на почту'
          //   })
          //   return true;
          // })
          //     .catch((error) => {
          //       this.$message({
          //         showClose: true,
          //         type: 'error',
          //         message: 'ошибка: пользователь с такими данными уже существует '
          //       })
          //       this.loading = false
          //       console.log(error)
          //       return false
          //     })

          this.$store.dispatch("auth/register", this.user).then(
              data => {
                this.loading = false
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: data.message
                })
                console.log(data)
              },
              error => {
                this.loading = false
                console.log(error)
                this.$message({
                  showClose: true,
                  type: 'info',
                  message: error.message
                })
              }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.reg-border {
  width: 22rem;
  min-width: 18rem;
  position: relative;
  top: 15vh;
  border-style: solid;
  border-top-color: lightslategrey;
  border-width: 15px 0px 0px 0px;
}

.reg-form-style {
  padding: 1rem;
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>