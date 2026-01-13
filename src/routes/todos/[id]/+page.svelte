

<form action="">
    <textarea 
            name="description"
            placeholder="Description"
    >{form?.description ?? ''}</textarea>


    <input 
        name="category" 
        placeholder="Catégorie"
        value={form?.category ?? ''} 
    />
</form>