# sanity-template-muna

**Not working!** sanity.io/create only works with *sanity-io/...* templates. Totally understandable and fine, but maybe one day the "Create" application will be released. The reasoning for having the ability to create Sanity studios based on a schema for digital humanities project, with plugins (eg. integration of api.nb.no resources) and a default website.

_[Sanity.io](https://sanity.io) starter template with a [Muna](https://muna-docs.vercel.app/) based studio._

This template repo is used by Sanity.io to easily create deployed and configured Muna-projects through a web interface. You can test it out by [creating this project](https://www.sanity.io/create/?template=tarjelavik%2Fsanity-template-muna).

The template contains a Sanity Studio. It can be deployed on Netlify.

## Local development

You develop the templates in `/template`, and review your changes in `/build`.

1. **Install dependencies with `npm install` in the root folder.** This will install the template development tool that watches changes in the `/template` folder and output the template to `/build`.

2. **Run `npm run dev` in root folder.** This will build the template files to `/build`. This is how the code will look for those who install the project later.

3. **Run `sanity install` in `/build/studio`** This will install the necessary dependencies for the Studio.

4. **Run `sanity start` in `/build/studio`**. This will start the development server for Sanity Studio.

## Notes

When developing, you may change `projectId` and `dataset` in `dev/template-values-development.json` to connect with a different Sanity project.
