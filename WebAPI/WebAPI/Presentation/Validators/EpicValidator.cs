using System;
using FluentValidation;
using WebAPI.Models.Models;

namespace WebAPI.Presentation.Validators
{
    public class EpicValidator : AbstractValidator<Epic>
    {
        public EpicValidator()
        {
            RuleFor(x => x.EpicName)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.ProjectId)
                .NotEmpty();
            RuleFor(x => x.StartDate)
                .NotEmpty();
            RuleFor(x => x.EndDate)
                .NotEmpty();
        }
    }
}