import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import Mainpage from "@/components/Mainpage";
import CreateDog from "@/components/CreateDog";
import UpdateDog from "@/components/UpdateDog";
import Statistics from "@/components/Statistics";
import FindDog from "@/components/FindDog";
import Feedhosts from "@/components/feedhosts/Feedhosts";
import CreateFeedhost from "@/components/feedhosts/CreateFeedhost";
import UpdateFeedhost from "@/components/feedhosts/UpdateFeedhost";
import Applicants from "@/components/applicants/Applicants";
import UpdateApplicant from "@/components/applicants/UpdateApplicant";
import CreateApplicant from "@/components/applicants/CreateApplicant";

import FormNavigator from "@/components/forms/FormNavigator";

import store from "@/store/store";
import FormChildren from "@/services/FormChildren";

Vue.use(Router);

//This function controls that a id token is present otherwise the application will open the login page
function guardRoutes(to, from, next) {
	const token = window.localStorage.getItem("msal.310549cf-ae4e-4d34-a15b-865c38b7d30f.idtoken")
	
	if(token){
		next()
	};
}

export default new Router({
  routes: [
    {
      path: "/",
      name: "mainpage",
      component: Mainpage,
	  beforeEnter: guardRoutes,
      meta: {
        announcer: "Startside"
      }
    },
    {
      path: "/dogs/create",
      name: "createDog",
      component: CreateDog,
      meta: {
        announcer: "Opret hund"
      }
    },
    {
      path: "/dogs/update/:dogid",
      name: "updateDog",
      component: UpdateDog,
      meta: {
        announcer: "Opdater hund"
      }
    },
    {
      path: "/forms/formnavigator",
      name: "form-navigator",
      component: FormNavigator,
      children: FormChildren.export(),
      meta: {
        announcer: "Lønbilag"
      }
    },
    {
      path: "/statistics",
      name: "statistics",
      component: Statistics,
      meta: {
        announcer: "Statistik"
      }
    },
    {
      path: "/feedhosts",
      name: "feedhosts-view",
      component: Feedhosts,
      meta: {
        announcer: "Foderværter"
      }
    },
    {
      path: "/feedhosts/update/:feedhostid",
      name: "feedhosts-update-view",
      component: UpdateFeedhost,
      meta: {
        announcer: "Opdater fodervært"
      }
    },
    {
      path: "/feedhosts/create",
      name: "feedhosts-create-view",
      component: CreateFeedhost,
      meta: {
        announcer: "Opret fodervært"
      }
    },
    {
      path: "/applicants",
      name: "applicants-view",
      component: Applicants,
      meta: {
        announcer: "Ansøgere"
      }
    },
    {
      path: "/applicants/update/:applicantid",
      name: "applicants-update-view",
      component: UpdateApplicant,
      meta: {
        announcer: "Opdater ansøger"
      }
    },
    {
      path: "/applicants/create",
      name: "applicants-create-view",
      component: CreateApplicant,
      meta: {
        announcer: "Opret ansøger"
      }
    },
    {
      path: "/dogs/find",
      name: "find-one-dog",
      component: FindDog,
      meta: {
        announcer: "Find en hund til matchning"
      }
    }
  ]
});
