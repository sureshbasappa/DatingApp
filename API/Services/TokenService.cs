using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenservice
    {
    private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        }

        public string CreateToken(AppUser User)
        {
            var claims = new List<Claim>{
                
                new Claim(JwtRegisteredClaimNames.NameId, User.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, User.UserName)

            };

            var creds =new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var TokenDescripter = new SecurityTokenDescriptor{

            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(TokenDescripter);

            return tokenHandler.WriteToken(token);
        }
    }
}