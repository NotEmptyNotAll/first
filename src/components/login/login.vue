<template>
  <div class="col-md-12">
    <div class=" container  rounded login-page login-border " style="width: 18vw">
      <div class="login-logo" style="display: flex;align-items: center">
        <div class="head-text deepshd ">
          <h2 v-show="!loading">&#63;</h2>
          <span class="lds-dual-ring " v-show="loading"></span>
        </div>
      </div>
      <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleLogin">
        <div class=" login-pad">
          <input
              type="text"
              class="form-control "
              name="username"
              v-model="user.username"
              v-validate="'required'"
          />
          <div
              class="alert alert-danger"
              role="alert"
              v-if="errors.has('username')"
          >{{ $ml.get('msg.userNamedErr') }}
          </div>
        </div>
        <div class=" login-pad">
          <input
              type="password"
              class="form-control"
              :name="$ml.get('word.password')"
              v-model="user.password"
              v-validate="'required'"
          />
          <div
              class="alert alert-danger"
              role="alert"
              v-if="errors.has('password')"
          >{{ $ml.get('msg.passwordErr') }}
          </div>

        </div>
        <div class=" login-pad">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span>{{ $ml.get('word.loginOnButton') }}</span>
          </button>
        </div>

<!--        <div class="alert alert-danger" role="alert" v-if="message">{{ $ml.get('msg.authErr') }}</div>-->

        <el-button @click="toRegistration()" type="text">{{ $ml.get('word.registration') }}</el-button>

      </form>

    </div>
  </div>
</template>

<script>
import User from "../../models/user";

export default {
  name: "login",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message:null
    };
  },
  mounted() {
    document.body.oncontextmenu = function () {
      return true;
    };
    if (this.loggedIn) {
      this.$router.push("/#/");
    }
  },
  methods: {
    toRegistration() {
      this.$router.push("/registration");
    },
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll();

      if (this.errors.any()) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/#/");
            },
            error => {
              this.loading = false;
              this.message = error;
              this.$message({
                showClose: true,
                type: 'error',
                message: this.$ml.get('msg.authErr')+': '+error.message
              })
            }
        );
      }
    }
  }
};
</script>

<style>
.login-page {
  max-width: 25rem;
  width: 22rem;
  min-width: 18rem;
  max-height: 29.5rem;
  min-height: 29rem;
  position: relative;
  top: 15vh;
  text-align: center;
}

.login-border {
  border-style: solid;
  border-top-color: lightslategrey;
  border-width: 15px 0px 0px 0px;
}

.login-logo {
  z-index: 999;
  position: absolute;
  left: 20%;
  right: 20%;
  top: 0px;
  width: 60%;
  height: 45px;
  background: lightslategrey;
  border-bottom-right-radius: 90px;
  border-bottom-left-radius: 90px;
}

.login-pad {
  padding: 1.5rem 1rem 0rem;
}

.profile-img-card {
  position: relative;
  bottom: 1.2vh;
  width: 66%;
  height: 22vh;
}
</style>