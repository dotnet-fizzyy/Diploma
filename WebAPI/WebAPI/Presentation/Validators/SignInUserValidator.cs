using FluentValidation;
using WebAPI.Presentation.Models;
using WebAPI.Presentation.Models.Request;

namespace WebAPI.Presentation.Validators
{
    public class SignInUserValidator : AbstractValidator<SignInUserRequestModel>
    {
        public SignInUserValidator()
        {
            RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty();
        }
    }
}