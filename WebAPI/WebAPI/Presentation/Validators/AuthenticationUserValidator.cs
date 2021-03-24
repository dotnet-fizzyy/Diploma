using FluentValidation;
using FluentValidation.Validators;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class AuthenticationUserValidator : AbstractValidator<AuthenticationUser>
    {
        public AuthenticationUserValidator()
        {
            RuleFor(x => x.UserName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Password)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                .NotNull()
                .NotEmpty()
#pragma warning disable 618
                .EmailAddress(EmailValidationMode.Net4xRegex)
#pragma warning restore 618
                .WithMessage("Provided email is not valid");
        }
    }
}