import { Editor } from '@tinymce/tinymce-react'
import React from 'react'
import { Controller } from 'react-hook-form'

// Here, we are only creating the Editor Component, But the place where ae are using it, we need the reference for it to get the data from the editor.
// We can use the Forward Reference as well, but instead we can use the Controller that we get from react-hook-form.
// Here, we don't need to use the hook like forward ref here

// control : This control is passed from the place where it is used and it is passed from the react-hook-form
function RichTextEditor({ name, control, label, defaultValue = "" }) {
    return (
        <div className="w-full">
            {
                label && <label className='inline-block mb-1 pl-1'>{label}</label>
            }

            {/* Controller */}
            <Controller
                name={name || "content"}
                control={control}
                // This will render the field when the content or field is changed
                render={({ field: { onChange } }) => (
                    // here, we will add the components or HTML that we want to render
                    <Editor
                        // Refer the documentation for more
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        // This will call this function when the editor is changed
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

export default RichTextEditor
