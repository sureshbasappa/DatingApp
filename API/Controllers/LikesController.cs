using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userReposityry;
        private readonly ILikesRepository _likesRepository;
        public LikesController(IUserRepository userReposityry, ILikesRepository likesRepository)
        {
            _likesRepository = likesRepository;
            _userReposityry = userReposityry;
        }
        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username){
            
            var sourceUserId=User.GetUserId();
            var likedUser=await _userReposityry.GetUserByUsernameAsync(username);
            var SourceUser=await _likesRepository.GetUserWithLikes(sourceUserId);

            if(likedUser==null) return NotFound();

            if(SourceUser.UserName==username) return BadRequest("You Cannot Like yourself");

            var userLike=await _likesRepository.GetUserLike(sourceUserId,likedUser.Id);

            if(userLike!=null) return BadRequest("you already like this user");

            userLike=new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId=likedUser.Id
            };

            SourceUser.LikedUsers.Add(userLike);

            if(await _userReposityry.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikeParams likeParams){
            
            likeParams.UserId=User.GetUserId();
            
            var users=await _likesRepository.GetUserLikes(likeParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPage);

            return Ok(users);
        }

    }
}