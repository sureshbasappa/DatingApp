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
        public DateTime Created{get;set;}
        public DateTime LastActive{get;set;}
        public string Gender{get;set;}
        public string Interduction{get;set;}
        public string LookingFor{get;set;}
        public string Intests{get;set;}
        public string City{get;set;}
        public string Country{get;set;}
        public ICollection<Photo> Photos{get;set;}

        // public int GetAge(){

        //     return DateOfBirth.CalculateAge();
            
        // }

    }
}