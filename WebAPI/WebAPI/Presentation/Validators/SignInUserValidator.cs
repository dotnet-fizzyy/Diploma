using FluentValidation;
using WebAPI.Models.Models.Authentication;

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