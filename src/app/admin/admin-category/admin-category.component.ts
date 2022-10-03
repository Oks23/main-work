import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  private currentCategoryId = 0;
  public isOpen = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr:ToastrService,
    private imageService:ImageService,
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  addCategory(): void {
    if(this.editStatus){
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories();
        this.toastr.success('Категорію успішно оновлено!');
      })
    } else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.loadCategories();
        this.toastr.success('Категорію успішно додано!');
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
    window.scroll({
      top:0,
      behavior:'smooth'
    })
    this.isOpen = true;
  }

  deleteCategory(category: ICategoryResponse): void {
     if (confirm('Видалити цю катигорію?')){
      this.categoryService.delete(category.id).subscribe(() => {
        this.loadCategories();
        this.toastr.success('Категорію успішно видалено!');
      })
     }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadPercent = this.imageService.uploadPercent;
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        if (this.uploadPercent === 100){
            this.isUploaded = true;
        }
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
  triggerOpenForm():void{
    this.isOpen=!this.isOpen;
    this.isUploaded = false;
    this.editStatus = false;
  }
}
