import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscription.subscription', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("User not authenticated");
    }

    const { data } = ctx.request.body;

    const enhancedData = {
      ...data,
      users_permissions_user: user.id,
    };

    const response = await strapi.entityService.create('api::subscription.subscription', {
      data: enhancedData,
      populate: ['meal_plan'],
    });

    return ctx.created(response);
  },
}));
