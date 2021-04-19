using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName{get;set;}
        public byte[] PasswordHash{get;set;}
        public byte[] PasswordSolt{get;set;}
        public DateTime DateOfBirth {get;set;}
        public string IsKnownAs{get;set;}
        public DateTime Created{get;set;} = DateTime.Now;
        public DateTime LastActive{get;set;} = DateTime.Now;
        public string Gender{get;set;}
        public string Interduction{get;set;}
        public string LookingFor{get;set;}
        public string Intests{get;set;}
        public string City{get;set;}
        public string Country{get;set;}
        public ICollection<Photo> Photos{get;set;}
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }

        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
    }
}