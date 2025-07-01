import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::testimonial.testimonial', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("User not authenticated");
    }

    const { review, rating } = ctx.request.body.data;

    const entry = await strapi.entityService.create('api::testimonial.testimonial', {
      data: {
        review,
        rating,
        users_permissions_user: user.id,
      },
    });

    return ctx.send(entry);
  }
}));
