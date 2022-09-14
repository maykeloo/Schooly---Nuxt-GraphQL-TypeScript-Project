<script setup lang="ts">
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { SIGN_UP } from "../../api/mutations";

const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const bio = ref<string>("");
const errorMessage = ref<string>("");

const { mutate: SignUp, onDone } = useMutation(SIGN_UP, () => ({
  variables: {
    user: {
      name: name.value,
      email: email.value,
      password: password.value,
      bio: bio.value
    }
  }
}))

const handleClick = () => {
  SignUp()
  onDone(result => {
    if (result.data.signUp.userErrors.length > 0) {
      errorMessage.value = result.data.signUp.userErrors[0].message;
    } else {
      errorMessage.value = "";
      localStorage.setItem("token", result.data.signUp.token);
      window.location.href = "/";
    }
  })
};

</script>

<template>
  <div class="login-content-wrapper">
    <div class="login-container-left">
      <div class="login-content-top-information">
        <h1>Sign up</h1>
        <p>Enter credentials to create your account.</p>
      </div>
      <div class="login-button google">
        <img src="@/assets/icons/icon-google.svg" alt="" />
        <span>Sign up with Google</span>
      </div>
      <div class="or-line">
        <span>or</span>
      </div>
      <form>
        <label for="name">
          <span>Name</span>
          <input type="text" name="name" id="name" v-model="name" />
        </label>
        <label for="email">
          <span>Email address</span>
          <input type="email" name="email" id="email" v-model="email" />
        </label>
        <label for="password">
          <div>
            <span>Password</span>
            <span class="password-hint">Forgot password?</span>
          </div>
          <input type="password" name="password" id="password" v-model="password"/>
        </label>
        <label for="bio">
          <span>Bio</span>
          <textarea type="text" name="bio" id="bio" v-model="bio"></textarea>
        </label>
        <div class="error" v-if="errorMessage">
          <img src="@/assets/icons/icon-login-error.png" alt="" />
          <p>{{ errorMessage }}</p>
        </div>
        <button type="submit" class="submit-button" @click.prevent="handleClick">
          Sign up
        </button>
      </form>
      <div class="signup-label">
        <span>Already a member? </span><NuxtLink to="/signin">Sign Up</NuxtLink>
      </div>
    </div>
    <div class="login-container-right"></div>
  </div>
</template>


<style scoped lang="scss">
  .login-content-wrapper {
    width: 50vw;
    margin: 0 auto;
    display: flex;
    gap: 3rem;
  
    @media screen and (max-width: 786px) {
      width: 90%;
      flex-direction: column-reverse;
    }
  
    .login-container-left {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;
  
      @media screen and (max-width: 786px) {
        width: 100%;
      }
    }
  
    .login-container-right {
      background: rgba(204, 204, 204, 0.295);
      width: 55%;
      display: block;
      flex-grow: 1;
      border-radius: 0.5rem;
  
      @media screen and (max-width: 786px) {
        height: 300px;
        width: 100%;
      }
    }
  
    .login-content-top-information {
      h1 {
        font-weight: 500;
      }
  
      p {
        margin-top: 0.85rem;
        color: #ccc;
      }
    }
  
    .login-button {
      &.google {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 0.3rem;
        box-shadow: 3px 3px 3px -4px #999;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 2.5rem;
  
        &:hover {
          background: #edf6f9;
        }
  
        span {
          font-weight: 400;
        }
  
        img {
          width: 2rem;
        }
      }
    }
  
    .or-line {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 1.75rem;
  
      span {
        display: block;
        padding: 1rem;
        background: white;
        color: #ccc;
        font-weight: 400;
      }
  
      &:after {
        position: absolute;
        content: "";
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 0.5px;
        width: 100%;
        background: #ccc;
        z-index: -1;
        border-radius: 5px;
      }
    }
  
    form {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
  
      > label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.9rem;
        font-weight: 500;
  
        > div {
          display: flex;
          justify-content: space-between;
  
          .password-hint {
            color: #006d77;
            cursor: pointer;
          }
        }
  
        > input {
          padding: 0.75rem;
          outline: none;
          font-size: 1.1rem;
          font-weight: 600;
          border: 1px solid #ccc;
          border-radius: 0.3rem;
          font-family: "Rubik";
        }

        > textarea {
          max-width: 100%;
          min-height: 75px;
          max-height: 150px;
          min-width: 100%;
          padding: 0.75rem;
          outline: none;
          font-size: 1.1rem;
          font-weight: 600;
          border: 1px solid #ccc;
          border-radius: 0.3rem;
          font-family: "Rubik";
        }
      }
      .submit-button {
        background: #006d77;
        outline: none;
        border: 0;
        padding: 0.85rem 0.5rem;
        border-radius: 0.3rem;
        font-weight: 400;
        font-size: 1.05rem;
        cursor: pointer;
        transition: 0.3s;
        color: white;
        margin-top: 1rem;
  
        &:hover {
          background: #83c5be;
        }
      }
  
      .error {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: red;
      }
    }
  
    .signup-label {
      margin-top: 1.5rem;
      font-size: 0.9rem;
      a {
        color: #006d77;
      }
    }
  }
  </style>
  