using FluentValidation;
using FluentValidation.Validators;
using WebAPI.Presentation.Models.Action;

#pragma warning disable 618

namespace WebAPI.Presentation.Validators
{
    public class SignUpUserValidator : AbstractValidator<SignUpUser>
    {
        public SignUpUserValidator()
        {
            RuleFor(x => x.Email)
                .Cascade(CascadeMode.Stop)
                    .NotNull()
                    .NotEmpty();
            RuleFor(x => x.Password)
                .Cascade(CascadeMode.Stop)
                    .NotNull()
                    .NotEmpty();
            RuleFor(x => x.UserName)
                .Cascade(CascadeMode.Stop)
                    .NotNull()
                    .NotEmpty()
                    .EmailAddress(EmailValidationMode.Net4xRegex)
                        .WithMessage("Provided email is not valid");
        }
    }
}