using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Collections.Generic;
using API.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
         
            return await _context.Users.ToListAsync();
           

        }
        //Api/users/1
        [Authorize]
        [HttpGet("{id}")]

        public ActionResult<AppUser> GetUsers(int id)
        {
         
            return _context.Users.Find(id);;

        }
    }
}