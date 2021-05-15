using FluentValidation;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Action;

namespace WebAPI.Presentation.Validators
{
    public class SignInUserValidator : AbstractValidator<SignInUser>
    {
        public SignInUserValidator()
        {
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}