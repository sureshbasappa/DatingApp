using Microsoft.AspNetCore.Mvc;
using API.Data;
using System.Collections.Generic;
using API.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.Data.DTOs;
using AutoMapper;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;

        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users=await _userRepository.GetMembersAsync();

            return Ok(users);
        }
        //Api/users/1

        [HttpGet("{userName}")]

        public async Task<ActionResult<MemberDto>> GetUsers(string userName)
        {
            return await _userRepository.GetMemberAsync(userName);

        }

        [HttpPut]
        public async Task<ActionResult>updateMember(MemberUpdateDto memberUpdateDto)
        {
            var username=User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userRepository.GetUserByUsernameAsync(username);
            _mapper.Map(memberUpdateDto,user);
            _userRepository.Update(user);

            if(await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("failed to update user");

        }

    }
}