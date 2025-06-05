window.addEventListener('load', solve);
function solve() {

    const eggTypeEl = document.getElementById(`egg-type`)
    const sizeEl = document.getElementById(`size`)
    const baseColorEl = document.getElementById(`base-color`)
    const paternEl = document.getElementById(`pattern`)
    const decorationEl = document.getElementById(`decorations`)

    const btnCreateEl = document.getElementById(`create-btn`)
    const reviewEl = document.querySelector(`.review-list`)
    const confimListEl = document.querySelector(`.confirm-list`)

    const needetImEl = document.getElementById(`complete-img`)
    const copletetTextEl = document.getElementById(`complete-text`)

    btnCreateEl.addEventListener(`click` ,sorceFnc )

    function sorceFnc(e) {

        e.preventDefault()
        
         needetImEl.style.display = `none`
         copletetTextEl.textContent = ``

        let arr = [eggTypeEl.value , sizeEl.value , baseColorEl.value , paternEl.value , decorationEl.value]
      
        if (arr.some(value => value === ``)){
            return 
        }

        const dataConvert = showInputs(eggTypeEl.value , sizeEl.value , baseColorEl.value , paternEl.value , decorationEl.value)
          
        reviewEl.appendChild(dataConvert)

       

         eggTypeEl.value = ``
         sizeEl.value = ``
         baseColorEl.value = `` 
         paternEl.value = ``
         decorationEl.value = ``

         btnCreateEl.setAttribute(`disabled` , `disabled`)


       
        
    }

    function showInputs(egg,size,color,patern,decoration) {

        const createPegg = document.createElement(`p`)
        createPegg.textContent = `${egg}`

        const createPsize = document.createElement(`p`)
        createPsize.textContent = `${size}`

        const createPcolor = document.createElement(`p`)
        createPcolor.textContent = `${color}`

        const createPpatern = document.createElement(`p`)
        createPpatern.textContent = `${patern}`

        const createPdecoration = document.createElement(`p`)
        createPdecoration.textContent = `${decoration}`

        const articleEl = document.createElement(`article`)
        articleEl.appendChild(createPegg)
        articleEl.appendChild(createPsize)
        articleEl.appendChild(createPcolor)
        articleEl.appendChild(createPpatern)
        articleEl.appendChild(createPdecoration)
        
        const createBtnEdit = document.createElement(`button`)
        createBtnEdit.classList.add(`edit-btn`)
        createBtnEdit.textContent = `Edit`

        createBtnEdit.addEventListener(`click` , (event) => {

         eggTypeEl.value = egg
         sizeEl.value = size
         baseColorEl.value = color 
         paternEl.value = patern
         decorationEl.value = decoration

         const needetElToDelete = document.querySelector(`.egg-content`)
         needetElToDelete.remove()
         
         btnCreateEl.removeAttribute(`disabled`)
        })


        const createBtnContinue = document.createElement(`button`)
        createBtnContinue.classList.add(`continue-btn`)
        createBtnContinue.textContent = `Continue`


        createBtnContinue.addEventListener(`click` , ()=>{
          
            const needetElToDelete = document.querySelector(`.egg-content`)
            needetElToDelete.remove()


            const createBtnConfrim = document.createElement(`button`)
            createBtnConfrim.classList.add(`confirm-btn`)
            createBtnConfrim.textContent = `Confirm`

            createBtnConfrim.addEventListener(`click` , (e)=> {
                btnCreateEl.removeAttribute(`disabled`)

                needetImEl.style.display = `block`
                copletetTextEl.textContent = `Your egg is ready!`

                const needetElToDelete = document.querySelector(`.egg-content`)
                needetElToDelete.remove()



            })

            const createBtnCancel = document.createElement(`button`)
            createBtnCancel.classList.add(`cancel-btn`)
            createBtnCancel.textContent = `Cancel`

            createBtnCancel.addEventListener(`click` , (e) => {

                btnCreateEl.removeAttribute(`disabled`)

                const needetElToDelete = document.querySelector(`.egg-content`)
                needetElToDelete.remove()
            })

            const liEl = document.createElement(`li`)
            liEl.classList.add(`egg-content`)

            liEl.appendChild(articleEl)
            liEl.appendChild(createBtnConfrim)
            liEl.appendChild(createBtnCancel)

            confimListEl.appendChild(liEl)
            
        })

        const createLi = document.createElement(`li`)
        createLi.classList.add(`egg-content`)

        createLi.appendChild(articleEl)
        createLi.appendChild(createBtnEdit)
        createLi.appendChild(createBtnContinue)

        return createLi
    }
}