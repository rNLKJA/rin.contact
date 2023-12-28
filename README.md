# Hello there (ฅ'ω'ฅ) This is Rin Huang

> I am a Data Science student currently study in the [University of Melbourne](https://www.unimelb.edu.au/) 🇦🇺 from China 🇨🇳
>
> I'm interesting in data science and passionate in data.
>
> This repository is my personal react-app, I want to build this webpage as my personal CV page/blog page, I don't know how long this will take but I will try my best!

---

## Table of Content

- [Hello there (ฅ'ω'ฅ) This is Rin Huang](#hello-there-ฅωฅ-this-is-rin-huang)
  - [Table of Content](#table-of-content)
  - [About the usage](#about-the-usage)
  - [Deploy your website](#deploy-your-website)
  - [Problem with custom domain](#problem-with-custom-domain)
  - [Next TODO](#next-todo)
  - [LICENSE](#license)

---

## About the usage

To update your own profile information. Please make sure that you copy this repository and install all required packages. To avoid package conflicts, please avoid use `npm audit fix` feature.

```bash
# Install required react packages
yarn install

# Install required npm packages
npm i

# Run the Next.js app in the development mode.
npm run dev
```

After install process, try use command `npm run dev` to run the next.js app, this is what you should have in first start up!

If you see the above page, then you could modify the information under the directory `./`, components are available in `/components` folder, and pages available in `/pages`.

---

## Deploy your website

You could deploy this application on various platforms like heroku, aws, google, etc. Here I will suggest you deploy this on github pages since this is a light website and most importantly, it's free and convenience!

Before deploy your website, the first thing is create a github repository with your prefer repo name.

Second, you need to make sure `gh-pages` is installed correctly, if not, please install using command `npm install gh-pages --save-dev` or `npm install gh-pages -g` to install globally.

After that, you need to modify the package.json file.

1. You need to change the `"homepage"` attribute to your github repository with the format`https://<github username>.github.io/<repo name>`, for example: `https://chuangyu-hscy.github.io/rNLKJA`.
2. Change the `"name"` attribute which is below `"homepage"`, because this is your own webpage, change it with your prefer name! Notice there is no space allow in `"name"` otherwise it will cause a compile error.
3. Check both `"predeploy"` and `"deploy"` command exist in `"script"` attribute, if not you need to add the following lines: `"predeploy": "npm run build","deploy": "gh-pages -d build"` in `"script"` attribute.
4. It is time to deploy your react webpage! Run `npm run deploy` and you will receive a success output!
5. Go to your repository, go to setting and click pages tag on the left navigation column. Once you in the right page, you should see the webpage link and good to go!

If you want some reading guides for `gh-pages` deployment, please visit this article written by [freeCodeCamp](https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/).

---

## Problem with custom domain

If you add your custom domain, you need to change `"homepage"` attribute the same as the custom domain, otherwise you will have a blank page. After deploy, please wait for 5 mins to visit your webpage, if you still receive a 404 error after 5-10 mins, you may need to check the above steps again or looking for help via stack overflow or google.

You may receive a error message that Github says: _TLS certificate is being provisioned. This may take up to 15 minutes to complete. 1 of 3 Certificate Request Error: Certificate provisioning will retry automatically in a short period, please be patient_. In this case you may need to check your DNS configuration. Here is an example of my Google domain DNS configuration:

<img src="https://github.com/chuangyu-hscy/rNLKJA/blob/rin-profile-ts/public/README/DNS_setting.png" alt="Google DNS config" />

DNS configuration should be similar cross different platforms, if anything confuse please lookup the github pages official guidance.

After configure your DNS setting, please remove your custom domain and add again. Github will automatically re-issue your TLS certificate so you could activate **HTTPS enforce** option.

---

## Next TODO

- [ ] i18n support for both Chinese and English to provide more convenience experience for future users. (Ok I'm working on it !!!!)

---

## LICENSE

In this project, all images were downloaded from copyright free website, e.g. Unsplash, pngTree, etc. If you want to use this web page for commercial usage, I strongly recommend you to check the copyright documents to avoid any legal issue.

To check the license for this repo, please click [here](https://github.com/chuangyu-hscy/rNLKJA/blob/rin-profile-ts/LICENSE).

---

2023-12-29 @rNLKJA