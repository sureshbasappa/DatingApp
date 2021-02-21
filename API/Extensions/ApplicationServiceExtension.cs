using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config){

            services.AddScoped<ITokenservice, TokenService>();

            services.AddDbContext<DataContext>(Options =>
             {
                 Options.UseSqlite(config.GetConnectionString("DefaultConnection"));
             });

             return services;

        }


    }
}