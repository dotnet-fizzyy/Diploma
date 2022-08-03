using FluentValidation;
using WebAPI.Models.Basic;

namespace WebAPI.Presentation.Validators
{
    public class TeamValidator : AbstractValidator<Team>
    {
        public TeamValidator()
        {
            RuleFor(x => x.Location)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.TeamName)
                .NotNull()
                .NotEmpty();
        }
    }
}