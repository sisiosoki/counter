let Counter = {
    fields: new Map([
        ['age', 0],
        ['height', 0],
        ['weight', 0],
        ['gender', 'male'],
        ['activity', 'min'],
    ]),
    activityCoefficients: new Map([
        ["min", 1.2],
        ["low", 1.375],
        ["medium", 1.55],
        ["high", 1.725],
        ["max", 1.9]
    ]),
    fieldResult: undefined,
    buttonCalc: undefined,
    buttonClear: undefined,
    setField(value, field)
    {
        if ( this.fields.has(field) ) this.fields.set(field, value);

        this.checkFilledFields();
    },
    checkFilledFields()
    {
        let haveEmptyFields = false;

        for (let value of this.fields.values()) 
        {
            if (!value || value == "0")
            {
                haveEmptyFields = true;
                break;
            }
        }

        let haveAnyFilled = false;

        for (let key of this.fields.keys()) 
        {
            if (key == "age" || key == "height" || key == "weight")
            {
                if (this.fields.get(key)) haveAnyFilled = true;
            }
        }

        if (haveAnyFilled) this.buttonClear.disabled = false;
        else this.buttonClear.disabled = true;

        if (!haveEmptyFields) this.buttonCalc.disabled = false;
        else this.buttonCalc.disabled = true;
    },
    handlerClickSubmit(e, nameButton)
    {
        if (nameButton == "reset")
        {
            e.preventDefault();

            // clear inputs
            this.fields = new Map([
                ['age', 0],
                ['height', 0],
                ['weight', 0],
                ['gender', 'male'],
                ['activity', 'min'],
            ]);

            for (let key of this.fields.keys()) 
            {
                let input = document.querySelector("input[name='"+ key +"']");
                let value = this.fields.get(key);

                if (input.type == "text") input.value = value;
                
                if (input.type == "radio")
                    document.querySelector("input[name='"+ key +"'][value='"+ value +"']").checked = true;
                             
            }
               
            this.fieldResult.classList.add('counter__result--hidden');
            this.checkFilledFields();
            return false;
        }
    },
    onSubmitForm(form, e)
    {
        e.preventDefault();

        let N = 0;

        switch (this.fields.get("gender")) 
        {
            case "male":
                N = (10 * this.fields.get("weight")) + (6.25 * this.fields.get("height")) - (5 * this.fields.get("age")) + 5
            break;

            case "female":
                N = (10 * this.fields.get("weight")) + (6.25 * this.fields.get("height")) - (5 * this.fields.get("age")) - 161
            break;
        
            default: break;
        }
        
        N *= this.activityCoefficients.get( this.fields.get("activity") );

        this.fieldResult.classList.remove('counter__result--hidden');
        this.setResults(N);
    },
    setResults(valueNormal)
    {
        let tallage = valueNormal / 100 * 15;

        this.fieldResult.querySelector("#calories-norm").textContent = Math.round(valueNormal);
        this.fieldResult.querySelector("#calories-minimal").textContent = Math.round(valueNormal - tallage);
        this.fieldResult.querySelector("#calories-maximal").textContent = Math.round(valueNormal + tallage);
    }
}

export {Counter};